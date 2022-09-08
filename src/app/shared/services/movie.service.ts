import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageResult } from '../models/page';
import { Observable } from 'rxjs';
import { MovieResult } from '../models/movie';
import { defaultLimit, internalURL, url } from '../common/const';
import { DataResult, HomeResult } from '../models/data';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<PageResult> {
    return this.http.get<PageResult>(`${url}/danh-sach/phim-moi-cap-nhat?page=${page}`);
  }

  getMovie(slug: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${url}/phim/${slug}`);
  }

  getData(): Observable<DataResult> {
    return this.http.get<DataResult>(`${internalURL}/data`);
  }

  getHightLight(): Observable<DataResult> {
    return this.http.get<DataResult>(`${internalURL}/high-light`);
  }

  getHomeData(prefer?: string): Observable<HomeResult> {
    return this.http.get<HomeResult>(`${internalURL}/home?prefer=${prefer}`);
  }

  addFavoriteMovies() {

  }

  getFavoriteMovies() {

  }

  getMoviesInternal(urlPath: string, page?: number, prefer?: string): Observable<DataResult> {
    const query = `?page=${page || 1}&limit=${defaultLimit || 1}&prefer=${prefer}`;
    return this.http.get<DataResult>(`${internalURL}/danh-sach/${urlPath}${query}`);
  }

  search(str?: string, type?: string, genre?: string, country?: string, status?: string, from?: number, to?: number, page?: number) {
    return this.http.get<DataResult>(
      `${internalURL}/tim-kiem?str=${str}&type=${type}&genre=${genre}&country=${country}` +
      `&status=${status}&from=${from}&to=${to}&page=${page || 1}&limit=10`
    );
  }

  getRecommended(category: string[], prefer?: string): Observable<DataResult> {
    return this.http.get<DataResult>(`${internalURL}/de-xuat?limit=10&category=${category}&prefer=${prefer}`);
  }
}

// https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}
