import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { APP_NAME_BANDWIDTH, APP_NAME_CATEGORY_SELECTED, APP_NAME_TYPE } from 'src/app/shared/common/const';
import { getDataLocalStorage, initializeAdMob, showAdMobBanner } from 'src/app/shared/common/utils';
import { LoggedInGuard } from 'src/app/shared/guards/canActive';
import { Data } from 'src/app/shared/models/data';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  movie: Movie;
  movies: Movie[] = [];
  currentPage = 1;
  totalPage = 1;
  data: Data;
  series: Movie[] = [];
  single: Movie[] = [];
  latest: Movie[] = [];
  anime: Movie[] = [];
  tvShows: Movie[] = [];
  cinema: Movie[] = [];
  type: any = {};
  safeData = true;
  selectedGenres = getDataLocalStorage(APP_NAME_CATEGORY_SELECTED) || [];
  constructor(
    private router: Router,
    private movieService: MovieService,
    private alertController: AlertController
  ) {
    this.initAd();
    console.log('innit ad');
    showAdMobBanner();
  }

  async initAd() {
    await initializeAdMob();
  }

  ngOnInit() {
    this.type = getDataLocalStorage(APP_NAME_TYPE);
    this.safeData = getDataLocalStorage(APP_NAME_BANDWIDTH);
    this.getHightLight();
    this.movieService.getHomeData(this.selectedGenres).subscribe(result => {
      this.series = result.data.series as Movie[];
      this.single = result.data.single as Movie[];
      this.latest = result.data.latest as Movie[];
      this.anime = result.data.hoathinh as Movie[];
      this.tvShows = result.data.tvshows as Movie[];
      this.cinema = result.data.cinema as Movie[];
    });
  }

  addToFavorite() {
    (new LoggedInGuard(this.router, this.alertController)).canActivate();
  }

  getHightLight() {
    this.movieService.getHightLight().subscribe(r => this.movie = r.data as Movie);
  }
}
