import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APP_NAME_CATEGORY_SELECTED, type } from 'src/app/shared/common/const';
import { getDataLocalStorage, getStatus, getStatusColor, parseHtmlToText } from 'src/app/shared/common/utils';
import { InternalPageResult } from 'src/app/shared/models/data';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  page = '';
  title = '';
  pageNumber = 0;
  movies: Movie[] = [];
  imgLoaded = 0;
  selectedGenres = getDataLocalStorage(APP_NAME_CATEGORY_SELECTED) || [];
  constructor(
    private activatedRoute: ActivatedRoute, private movieService: MovieService, private ngxService: NgxUiLoaderService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.page = paramMap.get('id');
      this.title = type.find(t => t.url === this.page).title;
      this.getMovies();
      this.ngxService.start();
    });
  }

  loaded() {
    this.imgLoaded++;
    if (this.imgLoaded === this.movies.length && this.movies.length > 0) {
      this.ngxService.stop();
    }
  }

  parseHtmlToText(html: string) {
    return html.length > 150 ? parseHtmlToText(html).slice(0, 150) + '...' : parseHtmlToText(html);
  }

  getStatusColor(status: string) {
    return getStatusColor(status);
  }

  getStatus(status: string) {
    return getStatus(status);
  }

  getMovies(event?: any) {
    this.pageNumber++;
    this.movieService.getMoviesInternal(this.pageNumber, this.selectedGenres, this.page).subscribe(result => {
      const data = result.data as InternalPageResult;
      this.movies = this.movies.concat(data.movies);
      if (event) {
        event.target.complete();
        if (this.pageNumber === data.allPage) {
          event.target.disabled = true;
        }
      }
    });
  }
}
