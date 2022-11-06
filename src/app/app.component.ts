import { Component, OnInit } from '@angular/core';
import { AdMob, AdMobBannerSize, BannerAdPluginEvents } from '@capacitor-community/admob';
import { PluginListenerHandle } from '@capacitor/core/types/definitions';
import { AlertController, Platform } from '@ionic/angular';
import {
  APP_NAME_TYPE,
  APP_NAME_STATUS,
  APP_NAME_COUNTRY,
  APP_NAME_CATEGORY,
  APP_NAME_TYPE_ARR,
  APP_NAME_STATUS_ARR
} from './shared/common/const';
import { MovieService } from './shared/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  listenerHandlers: PluginListenerHandle[] = [];
  /**
   * Height of AdSize
   */
  appMargin = 0;
  constructor(private movieService: MovieService, private platform: Platform, private modalCtrl: AlertController) {
    this.initializeApp();
  }

  ngOnInit() {
    this.movieService.getData().subscribe(result => {
      const data = result.data as any;
      this.saveDataLocalStorage(data.type, APP_NAME_TYPE, true);
      this.saveDataLocalStorage(data.status, APP_NAME_STATUS, null, true);
      localStorage.setItem(APP_NAME_COUNTRY, JSON.stringify(data.country));
      localStorage.setItem(APP_NAME_CATEGORY, JSON.stringify(data.category));
    });
  }

  saveDataLocalStorage(data: string[], key: string, isType?: boolean, isStatus?: boolean) {
    const obj: any = {};
    for (const s of data) {
      obj[s] = s;
    }
    if (isType) {
      obj.cinema = 'cinema';
      obj.latest = 'latest';
      const arr = [];
      for (const o in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, o)) {
          switch (o) {
            case 'series':
              arr.push({ key: o, title: 'Phim bộ' });
              break;
            case 'single':
              arr.push({ key: o, title: 'Phim lẻ' });
              break;
            case 'hoathinh':
              arr.push({ key: o, title: 'Hoạt hình' });
              break;
            case 'tvshows':
              arr.push({ key: o, title: 'TV Shows' });
              break;
            case 'cinema':
              arr.push({ key: o, title: 'Chiếu Rạp' });
              break;
            default:
              break;
          }
        }
      }
      localStorage.setItem(APP_NAME_TYPE_ARR, JSON.stringify(arr));
    }
    if (isStatus) {
      const arr = [];
      for (const o in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, o)) {
          switch (o) {
            case 'ongoing':
              arr.push({ key: o, title: 'Đang ra' });
              break;
            case 'trailer':
            case 'trailers':
              arr.push({ key: o, title: 'Trailer' });
              break;
            default:
              arr.push({ key: o, title: 'Hoàn thành' });
              break;
          }
        }
      }
      localStorage.setItem(APP_NAME_STATUS_ARR, JSON.stringify(arr));
    }
    localStorage.setItem(key, JSON.stringify(obj));
  }

  async ionViewWillEnter() {
    /**
     * Run every time the Ad height changes.
     * AdMob cannot be displayed above the content, so create margin for AdMob.
     */
    const resizeHandler = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info: AdMobBannerSize) => {
      this.appMargin = info.height;
      const app: HTMLElement = document.querySelector('ion-router-outlet');
      if (this.appMargin === 0) {
        app.style.marginBottom = '';
        return;
      }
      if (this.appMargin > 0) {
        const body = document.querySelector('body');
        const bodyStyles = window.getComputedStyle(body);
        const safeAreaBottom = bodyStyles.getPropertyValue('--ion-safe-area-bottom');
        app.style.marginBottom = `calc(${safeAreaBottom} + ${this.appMargin}px)`;
      }
    });
    this.listenerHandlers.push(resizeHandler);
  }

  ionViewWillLeave() {
    this.listenerHandlers.forEach(handler => handler.remove());
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status === 'notDetermined') {
        /**
         * If you want to explain TrackingAuthorization before showing the iOS dialog,
         * you can show the modal here.
         * ex)
         * const modal = await this.modalCtrl.create({
         *   component: RequestTrackingPage,
         * });
         * await modal.present();
         * await modal.onDidDismiss();  // Wait for close modal
         **/
        const modal = await this.modalCtrl.create({
          message: 'Please approve ads for maintain our service',
        });
        await modal.present();
        await modal.onDidDismiss();  // Wait for close modal
      }
      await AdMob.initialize({
        requestTrackingAuthorization: true
      });
    });
  }
}
