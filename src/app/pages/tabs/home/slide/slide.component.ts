import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { slideOpts } from 'src/app/shared/common/const';
import { getStatus, getStatusColor, initializeAdMob, parseHtmlToText, showAdMobBanner } from 'src/app/shared/common/utils';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input() title = '';
  @Input() urlPath = '';
  @Input() movies: Movie[] = [];

  imgLoaded = 0;
  slideOpts = slideOpts;
  constructor(private ngxService: NgxUiLoaderService) {
  }

  async ngOnInit() {
    this.ngxService.start();
    await initializeAdMob();
    console.log('innit ad');
    showAdMobBanner();
  }

  loaded() {
    this.imgLoaded++;
    if (this.imgLoaded === this.movies.length && this.movies.length > 0) {
      this.ngxService.stop();
    }
  }

  parseHtmlToText(html: string) {
    return html.length > 50 ? parseHtmlToText(html).slice(0, 50) + '...' : parseHtmlToText(html);
  }

  getStatusColor(status: string) {
    return getStatusColor(status);
  }

  getStatus(status: string) {
    return getStatus(status);
  }
}
