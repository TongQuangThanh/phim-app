import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton } from '@ionic/angular';
import { APP_NAME_CATEGORY, APP_NAME_CATEGORY_SELECTED } from 'src/app/shared/common/const';
import { getDataLocalStorage } from 'src/app/shared/common/utils';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  @ViewChild('back') back: IonBackButton;
  genres = getDataLocalStorage(APP_NAME_CATEGORY);
  selected = getDataLocalStorage(APP_NAME_CATEGORY_SELECTED) || [];
  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
  }

  toggleItem(item: string) {
    const idx = this.selected.indexOf(item);
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(item);
    }
  }

  cancel() {
    this.location.back();
  }

  submit() {
    localStorage.setItem(APP_NAME_CATEGORY_SELECTED, JSON.stringify(this.selected));
    this.router.navigateByUrl('/tabs/home');
  }
}
