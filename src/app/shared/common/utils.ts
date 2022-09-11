import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  AdLoadInfo, AdMob, AdMobBannerSize, AdMobRewardItem, BannerAdOptions,
  BannerAdPluginEvents, BannerAdPosition, BannerAdSize, RewardAdOptions, RewardAdPluginEvents
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { AlertController, isPlatform } from '@ionic/angular';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { adBannerAndroid, adBannerIos, adVideoAndroid, adVideoIos, APP_NAME_TOKEN } from './const';

export const setVideoPlayer = async (): Promise<any> => {
  const platform = Capacitor.getPlatform();
  return { plugin: CapacitorVideoPlayer, platform };
};

export const getDataLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? data[0] === '[' || data[0] === '{' ? JSON.parse(data) : data : false;
};

export const getStatusColor = (status: string) =>
  status === 'trailer' ? 'dark' : status === 'ongoing' ? 'warning' : status === 'completed' ? 'success' : 'medium';

export const getStatus = (status: string) => status === 'trailer' ? 'Trailer' : status === 'ongoing' ? 'Đang ra' :
  status === 'completed' ? 'Hoàn thành' : 'Không xác định';

export const alertLogin = async (alertController: AlertController, router: Router, isBack?: boolean, location?: Location) => {
  if (localStorage.getItem(APP_NAME_TOKEN)) {
    return true;
  }
  const alert = await alertController.create({
    header: 'Tính năng cần đăng nhập!',
    message: 'Bạn có muốn đăng nhập để sử dụng tính năng này không?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          if (isBack) {
            location.back();
          }
        }
      }, {
        text: 'OK',
        handler: () => {
          router.navigateByUrl('/login');
        }
      }
    ]
  });
  await alert.present();
};

export const parseHtmlToText = (html: string) => {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.textContent || span.innerText;
};

export const initializeAdMob = async (): Promise<void> => {
  const { status } = await AdMob.trackingAuthorizationStatus();
  console.log(status);
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
  }

  AdMob.initialize({
    requestTrackingAuthorization: true,
    // testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
    // initializeForTesting: true,
  });
};

export const showAdMobBanner = async () => {
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    // Subscribe Banner Event Listener
  });

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
    // Subscribe Change Banner Size
  });

  const options: BannerAdOptions = {
    adId: isPlatform('ios') ? adBannerIos : adBannerAndroid,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    // isTesting: true
    // npa: true
  };
  AdMob.showBanner(options);
};

export const showAdMobVideo = async () => {
  AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    // Subscribe prepared rewardVideo
  });

  AdMob.addListener(RewardAdPluginEvents.Rewarded, (adRewardItem: AdMobRewardItem) => {
    // Subscribe user rewarded
    console.log(rewardItem, adRewardItem);
  });

  const options: RewardAdOptions = {
    adId: isPlatform('ios') ? adVideoIos : adVideoAndroid,
    // isTesting: true
    // npa: true
    // ssv: {
    //   userId: "A user ID to send to your SSV"
    //   customData: JSON.stringify({ ...MyCustomData })
    //}
  };
  await AdMob.prepareRewardVideoAd(options);
  const rewardItem = await AdMob.showRewardVideoAd();
};
