import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { internalURL } from '../common/const';
import { DataResult } from '../models/data';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<DataResult> {
    return this.http.post<DataResult>(`${internalURL}/user/login`, { email, password });
  }

  register(email: string, password: string, rePassword: string): Observable<DataResult> {
    return this.http.post<DataResult>(`${internalURL}/user/register`, { email, password, rePassword });
  }
}
