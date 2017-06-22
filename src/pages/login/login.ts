import { TimelinePage } from './../timeline/timeline';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl :ToastController) {
  }

  ionViewDidLoad () {
    if (!localStorage.getItem("account")) {
      console.log(123)
      let user = { user: 'lrj', psw: "19950826" }
      localStorage.setItem('account', JSON.stringify(user))
    }

  }
  login (user, password) {
    let account: any = localStorage.getItem('account');
    account = JSON.parse(account);
    if (user == account.user && password == account.psw) {
      localStorage.setItem("login", 'true')
      this.navCtrl.setRoot(TimelinePage)
    }else{
      let toast =this.toastCtrl.create({
        message:"UserName Or Password invalid",
        duration:15000,
        position:"bottom",
        cssClass:"toast"
      })
      toast.present();
    }
  }
}
