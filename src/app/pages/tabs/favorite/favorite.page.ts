import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { alertLogin } from 'src/app/shared/common/utils';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  movies: Movie[] = [];
  pageNumber = 0;

  constructor(
    private router: Router,
    private location: Location,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  getFavoriteMovies(event?: any) {
    this.pageNumber++;
    // this.movieService.getMoviesInternal(this.page, this.pageNumber).subscribe(result => {
    //   const data = result.data as InternalPageResult;
    //   this.movies = this.movies.concat(data.movies);
    //   if (event) {
    //     event.target.complete();
    //     if (this.pageNumber === data.allPage) {
    //       event.target.disabled = true;
    //     }
    //   }
    // });
  }

  ionViewWillEnter() {
    alertLogin(this.alertController, this.router, true, this.location);
  }
}
