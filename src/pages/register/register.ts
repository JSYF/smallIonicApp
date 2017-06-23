import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  register (username, psw) {
    let toast = this.toastCtrl.create({
      duration: 1500,
      position: "bottom",
      cssClass: "toast"
    })
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (username.length == 0) {
      toast.setMessage("Place input your username")
      toast.present();
      return;
    }
    if (psw.length == 0) {
      toast.setMessage("place input your password")
      toast.present();
      return;
    }
    if (user == null) {
      let account = [{ username: username, password: psw }]
      localStorage.setItem('user', JSON.stringify(account));
      toast.setMessage("User register success!")
      toast.present()
      this.navCtrl.pop();
    } else {
      user.forEach(item => {
        if (item.username == username) {
          toast.setMessage("UserName is already exists")
          toast.present()
        } else {
          user.push({ username: username, password: psw })
          localStorage.setItem("user", JSON.stringify(user))
          toast.setMessage("User register success!")
          toast.present()
          this.navCtrl.pop();
        }
      });
    }
  }
}
