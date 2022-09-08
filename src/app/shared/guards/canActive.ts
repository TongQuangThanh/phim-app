import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { APP_NAME_TOKEN } from '../common/const';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanLoad {
  constructor(private router: Router, private alertController: AlertController) { }
  async canLoad(route: Route, segments: UrlSegment[]) {
    if (localStorage.getItem(APP_NAME_TOKEN)) {
      return true;
    }
    const alert = await this.alertController.create({
      header: 'Tính năng cần đăng nhập!',
      message: 'Bạn có muốn đăng nhập để sử dụng tính năng này không?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    await alert.present();
  }

  async canActivate() {
    if (localStorage.getItem(APP_NAME_TOKEN)) {
      return true;
    }
    const alert = await this.alertController.create({
      header: 'Tính năng cần đăng nhập!',
      message: 'Bạn có muốn đăng nhập để sử dụng tính năng này không?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    await alert.present();
  }
}
