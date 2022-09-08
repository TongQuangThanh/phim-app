import { Component, OnInit } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import {
  APP_NAME_TYPE,
  APP_NAME_STATUS,
  APP_NAME_COUNTRY,
  APP_NAME_TYPE_ARR,
  APP_NAME_CATEGORY,
  APP_NAME_STATUS_ARR,
  defaultShowChip,
} from 'src/app/shared/common/const';
import { getDataLocalStorage } from 'src/app/shared/common/utils';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
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
  constructor(private modalCtrl: ModalController, private pickerCtrl: PickerController) { }

  ngOnInit() {
    this.typesArr = getDataLocalStorage(APP_NAME_TYPE_ARR);
    this.statusArr = getDataLocalStorage(APP_NAME_STATUS_ARR);
    this.types = this.parseObjToArr(getDataLocalStorage(APP_NAME_TYPE));
    this.status = this.parseObjToArr(getDataLocalStorage(APP_NAME_STATUS));
    this.genres = getDataLocalStorage(APP_NAME_CATEGORY);
    this.countries = getDataLocalStorage(APP_NAME_COUNTRY);
  }

  parseObjToArr(obj: any) {
    const arr = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        arr.push(key);
      }
    }
    return arr;
  }

  showMore(key: string) {
    switch (key) {
      case 'type':
        this.showType = this.showType === defaultShowChip ? undefined : defaultShowChip;
        break;
      case 'genre':
        this.showGenre = this.showGenre === defaultShowChip ? undefined : defaultShowChip;
        break;
      case 'country':
        this.showCountry = this.showCountry === defaultShowChip ? undefined : defaultShowChip;
        break;
      case 'status':
        this.showStatus = this.showStatus === defaultShowChip ? undefined : defaultShowChip;
        break;
      default:
        break;
    }
  }

  toggleItem(arr: string[], item: string, key: string) {
    const idx = arr.indexOf(item);
    if (idx > -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(item);
    }
    switch (key) {
      case 'type':
        this.selectedTypes = arr;
        break;
      case 'genre':
        this.selectedGenres = arr;
        break;
      case 'country':
        this.selectedCountries = arr;
        break;
      case 'status':
        this.selectedStatus = arr;
        break;
      default:
        break;
    }
  }

  checkSelected(key: string, item: string) {
    switch (key) {
      case 'type':
        return this.selectedTypes.includes(item);
      case 'genre':
        return this.selectedGenres.includes(item);
      case 'country':
        return this.selectedCountries.includes(item);
      case 'status':
        return this.selectedStatus.includes(item);
      default:
        break;
    }
  }

  resetSelection(key: string) {
    switch (key) {
      case 'type':
        this.selectedTypes = [];
        break;
      case 'genre':
        this.selectedGenres = [];
        break;
      case 'country':
        this.selectedCountries = [];
        break;
      case 'status':
        this.selectedStatus = [];
        break;
      default:
        break;
    }
  }

  createRange(from: number, to: number) {
    const arr = [];
    for (let i = to; i > from; i--) {
      arr.push({ text: i, value: i });
    }
    return arr;
  }

  async openPicker(key: string) {
    const from = key === 'from' ? 1900 : this.from;
    const to = key === 'to' ? new Date().getFullYear() : this.to;
    const columns = [
      {
        name: 'key',
        options: this.createRange(from, to),
      }
    ];
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'key',
          options: this.createRange(from, to),
        }
      ],
      buttons: [
        {
          text: 'Hủy bỏ',
          role: 'cancel',
        },
        {
          text: 'Xác nhận',
          handler: (value) => {
            if (key === 'from') {
              this.from = value[columns[0].name].value;
            } else {
              this.to = value[columns[0].name].value;
            }
          },
        },
      ],
    });
    await picker.present();
  }

  reset() {
    this.selectedTypes = [];
    this.selectedGenres = [];
    this.selectedCountries = [];
    this.selectedStatus = [];
    this.from = 1900;
    this.to = new Date().getFullYear();
  }

  search() {
    this.modalCtrl.dismiss({
      type: this.selectedTypes,
      genre: this.selectedGenres,
      country: this.selectedCountries,
      status: this.selectedStatus,
      from: this.from,
      to: this.to,
    });
  }
}
