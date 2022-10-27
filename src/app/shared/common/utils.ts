import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { APP_NAME_TOKEN } from './const';

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
