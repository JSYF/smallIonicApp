import { TabsPage } from './../tabs/tabs';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public events: Events,public alertCtrl:AlertController) {
  }
  login (user, password) {
    let toast = this.toastCtrl.create({
      duration: 1500,
      position: "bottom",
      cssClass: "toast"
    })
    let users = JSON.parse(localStorage.getItem("user"));
    if (user.length == 0) {
      toast.setMessage("Place input your username")
      toast.present();
      return;
    }
    if (password.length == 0) {
      toast.setMessage("place input your password")
      toast.present();
      return;
    }
    if (users == null) {
      toast.setMessage("UserName does not exist")
      toast.present();
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == user) {
        if (users[i].password == password) {
          localStorage.setItem('account', JSON.stringify({ username: users[i].username, password: users[i].password }))
          this.navCtrl.setRoot(TabsPage)
          break;
        } else {
          toast.setMessage("Password invalid")
          toast.present();
          break;
        }
      }
      if (i == users.length - 1) {
        toast.setMessage("UserName does not exist")
        toast.present();
      }
    }
  }

  register () {
    this.navCtrl.push(RegisterPage)
  }

  ionViewDidLoad () {
    this.events.subscribe("user:logout", () => {
      let alert = this.alertCtrl.create({
        title: "Are you sure to leave?",
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'logout',
          handler: () => {
            localStorage.removeItem("account")
            this.navCtrl.setRoot(LoginPage)
          }
        }]
      })
      alert.present();
    })
  }
}
