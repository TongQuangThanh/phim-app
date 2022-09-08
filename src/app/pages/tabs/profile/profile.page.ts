import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { APP_NAME_TOKEN } from 'src/app/shared/common/const';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLogged = localStorage.getItem(APP_NAME_TOKEN);
  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.isLogged);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: 'Bạn thực sự muốn đăng xuất?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            localStorage.removeItem(APP_NAME_TOKEN);
            this.router.navigateByUrl('/tabs/home');
          }
        }
      ]
    });
    await alert.present();
  }
}
