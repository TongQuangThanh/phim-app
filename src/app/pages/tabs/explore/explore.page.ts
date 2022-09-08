import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { APP_NAME_TYPE_ARR, APP_NAME_STATUS_ARR, defaultShowChip } from 'src/app/shared/common/const';
import { getDataLocalStorage, getStatus, getStatusColor } from 'src/app/shared/common/utils';
import { InternalPageResult } from 'src/app/shared/models/data';
import { MovieService } from 'src/app/shared/services/movie.service';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  str = '';
  types = [];
  typesArr = [];
  genres = [];
  status = [];
  statusArr = [];
  countries = [];
  sort = [];
  defaultShowChip = defaultShowChip;
  showType = defaultShowChip;
  showGenre = defaultShowChip;
  showCountry = defaultShowChip;
  showStatus = defaultShowChip;
  selectedTypes = [];
  selectedCountries = [];
  selectedGenres = [];
  selectedStatus = [];
  from = 1900;
  to = new Date().getFullYear();
  movies = [];
  showFilter = true;
  pageNumber = 0;
  constructor(
    private modalCtrl: ModalController,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.typesArr = getDataLocalStorage(APP_NAME_TYPE_ARR);
    this.statusArr = getDataLocalStorage(APP_NAME_STATUS_ARR);
    this.activatedRoute.paramMap.subscribe(p => {
      const genre = p.get('genre');
      if (genre) {
        this.resetFilter();
        this.selectedGenres = [genre];
        this.search();
      }
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
    });
    modal.present();
    const data = await modal.onWillDismiss();
    if (data.data) {
      this.selectedTypes = data.data.type;
      this.selectedGenres = data.data.genre;
      this.selectedCountries = data.data.country;
      this.selectedStatus = data.data.status;
      this.from = data.data.from;
      this.to = data.data.to;
      this.search();
    }
  }

  resetFilter() {
    this.selectedTypes = [];
    this.selectedGenres = [];
    this.selectedCountries = [];
    this.selectedStatus = [];
    this.from = 1900;
    this.to = new Date().getFullYear();
  }

  search(event?: any) {
    if (!event) {
      this.movies = [];
      this.pageNumber = 0;
    }
    this.pageNumber++;
    this.movieService.search(
      this.str, this.selectedTypes.join(), this.selectedGenres.join(),
      this.selectedCountries.join(), this.selectedStatus.join(), this.from, this.to, this.pageNumber
    ).subscribe(result => {
      const data = result.data as InternalPageResult;
      this.movies = this.movies.concat(data.movies);
      this.showFilter = false;
      if (event) {
        event.target.complete();
        if (this.pageNumber === data.allPage) {
          event.target.disabled = true;
        }
      }
    });
  }

  getStatusColor(status: string) {
    return getStatusColor(status);
  }

  getStatus(status: string) {
    return getStatus(status);
  }
}
