import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  async showError(error: HttpErrorResponse) {
    this.alertController.getTop().then(async isAlert => {
      console.log(isAlert);
      if (!isAlert) {
        const alert = await this.alertController.create({
          header: 'Lỗi!!!',
          message: error.error.message,
          buttons: [{ text: 'OK', role: 'cancel' }]
        });
        await alert.present();
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body.errors) {
          this.showError({ error: event.body } as HttpErrorResponse);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.showError(error);
        return throwError(error);
      })
    );
  }
}
