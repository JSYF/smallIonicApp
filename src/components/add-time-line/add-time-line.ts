import { NavController, Events } from 'ionic-angular';
import { TimeLinedata } from './../../data/tiemlineData';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the AddTimeLineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-time-line',
  templateUrl: 'add-time-line.html',
  providers: [Camera]
})
export class AddTimeLineComponent {
  addStatus = true;
  imgUrl = '';
  //test
  // addStatus = false;
  // imgUrl = '123';
  //test end
  constructor(public camera: Camera, public navCtrl: NavController, public events: Events) {
  }


  addImage () {
    this.image();
  }
  eidtImage () {
    this.image();
  }
  image () {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.imgUrl = imageData
      this.addStatus = false;
    }, (err) => {
      console.log(err)
    });
  }
  publish (title, content) {
    let TimeLinedata = JSON.parse(localStorage.getItem("timeline"));
    let user = JSON.parse(localStorage.getItem("account"));
    let tempData = {
      id:TimeLinedata.length,
      img: this.imgUrl,
      user: user.username,
      title: title,
      content: content,
      time: moment().format('YYYY.MM.DD')
    }
    TimeLinedata.unshift(tempData);
    this.events.publish("timeline:update", TimeLinedata);
    localStorage.setItem("timeline", JSON.stringify(TimeLinedata));
    this.navCtrl.pop();
  }
  back(){
    this.navCtrl.pop();
  }
}
