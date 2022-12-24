import { Component } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';
import { adBannerIos, adBannerAndroid } from 'src/app/shared/common/const';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor() {}

  async ionViewWillEnter() {
    // TODO
    const adId = isPlatform('ios') ? adBannerIos : adBannerAndroid;
    // const adId = 'ca-app-pub-3940256099942544/2934735716';
    const options: BannerAdOptions = {
      adId,
      // TODO
      // isTesting: true,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    };
    await AdMob.showBanner(options);
  }
}
