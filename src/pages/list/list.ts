import { AddListItemComponent } from './../../components/add-list-item/add-list-item';
import { ElementRef } from '@angular/core';
import { JsonDataProvider } from './../../providers/json-data/json-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import * as moment from 'moment';
/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  list = "todolist"
  todolist = [];
  donelist = [];
  undonelist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonDataProvider: JsonDataProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events) {
  }
  ionViewDidLoad () {
    let data = JSON.parse(localStorage.getItem("listData"));
    if (data == null) {
      let listData = this.jsonDataProvider.getToDoListData();
      this.updateUndoneItem(listData.list);
      localStorage.setItem("listData", JSON.stringify(listData));
    } else {
      this.freshData(data.list)
      localStorage.setItem("listData", JSON.stringify(data))
    }
    this.events.subscribe("todolist:update", (data) => {
      this.freshData(data);
    })
  }
  addToDoItem () {
    let listComponent = this.modalCtrl.create(AddListItemComponent);
    listComponent.present();
  }
  editItem (id) {
    let alert = this.alertCtrl.create({
      title: "Content",
      message: "Place edit something what you want to do",
      inputs: [{
        name: "content",
        placeholder: "Content"
      }],
      buttons: [
        { text: "Cancel" },
        {
          text: "edit", handler: (data) => {
            let datas = JSON.parse(localStorage.getItem("listData"));
            datas.list.forEach(item => {
              if (item.id == id) {
                item.content = data.content;
              }
            });
            this.freshData(datas.list);
            localStorage.setItem("listData", JSON.stringify(datas));
          }
        }
      ]
    })
    alert.present();
  }
  setItem (id) {
    let alert = this.alertCtrl.create({
      title: "TodoItem Status",
      inputs: [{ type: 'radio', label: "done", value: "done" }, { type: 'radio', label: "undone", value: "undone" }],
      buttons: [{ text: 'Cancel' }, {
        text: "OK", handler: (data) => {
          let datas = JSON.parse(localStorage.getItem("listData"));
          datas.list.forEach(item => {
            if (item.id == id) {
              if (data == 'undone') {
                item.status = 2;
              } else {
                item.status = 1;
              }
            }
          });
          this.freshData(datas.list);
          localStorage.setItem("listData", JSON.stringify(datas));
        }
      }]
    })
    alert.present();
  }
  delItem (id) {
    let alert = this.alertCtrl.create({
      message: "Are you sure to delete this todoItem?",
      buttons: [{
        text: "Sure",
        handler: () => {
          let datas = JSON.parse(localStorage.getItem("listData"));
          datas.list.forEach((item, index) => {
            if (item.id == id) {
              datas.list.splice(index, 1);
            }
          });
          this.freshData(datas.list);
          localStorage.setItem("listData", JSON.stringify(datas));
        }
      }, {
        text: "No",
      }]
    })
    alert.present();
  }

  freshData (data) {
    this.todolist.splice(0, this.todolist.length);
    this.donelist.splice(0, this.donelist.length);
    this.undonelist.splice(0, this.undonelist.length);
    this.updateUndoneItem(data);
    this.sortItem(data);
    this.classifyList(data);
  }
  classifyList (data) {
    data.forEach(item => {
      if (item.status == 0) {
        this.todolist.push(item)
      } else if (item.status == 1) {
        this.donelist.push(item)
      } else {
        this.undonelist.push(item)
      }
    });
  }
  sortItem (data) {
    data.sort(function (a, b) {
      return a < b ? 1 : -1
    })
  }
  updateUndoneItem (data) {
    data.forEach((item) => {
      if (moment(item.endTime).isBefore() && item.status == 0) {
        item.status = 2;
      }
    })
  }
  logout () {
    this.events.publish("user:logout")
  }
}
