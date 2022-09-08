import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { APP_NAME_TOKEN, internalURL } from '../common/const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(APP_NAME_TOKEN);
    if (token && req.url.startsWith(internalURL)) {
      const headers = req.headers.set('Authorization', 'Bearer ' + token);
      const requestClone = req.clone({ headers });
      return next.handle(requestClone);
    } else {
      return next.handle(req);
    }
  }
}
