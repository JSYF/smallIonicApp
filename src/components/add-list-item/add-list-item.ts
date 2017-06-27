import { Events, ViewController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import * as moment from 'moment'
/**
 * Generated class for the AddListItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-list-item',
  templateUrl: 'add-list-item.html'
})
export class AddListItemComponent {

  timer: any;//ISO时间格式
  mintime: any;//ISO时间格式
  constructor(public events: Events, public viewCtrl: ViewController, public toastCtrl: ToastController) {
    let time = moment().add(8, 'h').add(1,'m').toISOString();
    this.mintime = time;
    this.timer = time;
  }
  showTime (text) {
    let message = this.toastCtrl.create({
      position: "bottom",
      duration: 1500
    })
    if (text.length == 0) {
      message.setMessage("Place input Something what you want to do")
      message.present();
      return;
    }
    let toDoListData = JSON.parse(localStorage.getItem("listData"));
    let time = moment(this.timer).subtract(8, 'h').format("YYYY-MMM-DD HH:mm");
    if(moment(time).isBefore(new Date())){
      message.setMessage("Place select time again");
      message.present();
      this.timer = moment().add(8, 'h').add(1,'m').toISOString()
      return;
    }
    toDoListData.list.push({ id: toDoListData.index, content: text, endTime: time, status: 0 })
    toDoListData.index = toDoListData.index + 1;
    this.events.publish("todolist:update", toDoListData.list);
    localStorage.setItem("listData", JSON.stringify(toDoListData));
    this.viewCtrl.dismiss();
  }
  back () {
    this.viewCtrl.dismiss();
  }
}
