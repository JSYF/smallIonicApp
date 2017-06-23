import { LoginPage } from './../login/login';
import { AddTimeLineComponent } from './../../components/add-time-line/add-time-line';
import { JsonDataProvider } from './../../providers/json-data/json-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';

/**
 * Generated class for the TimelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
  providers: [JsonDataProvider]
})
export class TimelinePage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonDataProvider: JsonDataProvider, public modalCtrl: ModalController, public events: Events, public alertCtrl: AlertController) {
  }
  ionViewWillEnter () {
    let data = this.jsonDataProvider.getTimeLineData();
    let timeLineData = localStorage.getItem('timeline');
    if (timeLineData == null) {
      localStorage.setItem('timeline', JSON.stringify(data));
      this.data = data
    } else {
      this.data = JSON.parse(timeLineData)
    }
  }
  addTimeLine () {
    let addComponent = this.modalCtrl.create(AddTimeLineComponent);
    addComponent.present();
  }

  ionViewDidLoad () {
    this.events.subscribe("timeline:update", (data) => {
      this.data = data
    })
  }
  delete (e) {
    let alert = this.alertCtrl.create({
      title: "Are you sure to delete the timeline?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.deleteItem(e.target.parentNode.id)
        }
      }]
    })
    alert.present();
  }
  deleteItem (id) {
    let arr = this.data;
    arr.forEach((item, index) => {
      if (item.id == id) {
        this.data.splice(index, 1);
      }
    });
  }
  logout () {
    
    this.events.publish("user:logout")
  }
}
