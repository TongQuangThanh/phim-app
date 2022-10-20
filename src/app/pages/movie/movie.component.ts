import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Country, Movie, MovieResult, ServerData } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { AlertController, IonSlides, isPlatform, ModalController } from '@ionic/angular';
import { getDataLocalStorage, getStatus, getStatusColor, parseHtmlToText, setVideoPlayer } from 'src/app/shared/common/utils';
import { APP_NAME_STATUS, APP_NAME_TYPE, PLAYER_ID, slideOpts, TRAILER_ID } from 'src/app/shared/common/const';
import { LoggedInGuard } from 'src/app/shared/guards/canActive';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdMob, AdMobBannerSize, BannerAdPluginEvents, RewardAdPluginEvents } from '@capacitor-community/admob';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @ViewChild('crew', { static: false }) swiperCrew?: IonSlides;
  @ViewChild('episode', { static: false }) swiperEpisode?: IonSlides;
  @ViewChild('more', { static: false }) swiperMore?: IonSlides;
  /**
   * Height of AdSize
   */
  appMargin = 0;
  isPlaying = false;
  movie: Movie;
  episodes: ServerData[] = [];
  showTimes = '';
  content = '';
  showAllContent = false;
  slideOpts = slideOpts;
  slideOptsCrew = { ...slideOpts, slidesPerView: 2.25, breakpoints: {} };
  playerId = PLAYER_ID;
  trailerId = TRAILER_ID;
  type: any = {};
  status: any = [];
  segment = 'more';
  url = '';
  trailerUrl: SafeResourceUrl;
  counter = 0;
  recommended: Movie[] = [];
  isPrepareReward = false;
  private readonly listenerHandlers: PluginListenerHandle[] = [];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {
    const handler = AdMob.addListener(RewardAdPluginEvents.Rewarded, (data) => {
      this.playFullScreen(this.url);
    });
    this.listenerHandlers.push(handler);
    // const adId = isPlatform('ios') ? adVideoIos : adVideoAndroid;
    const adId = 'ca-app-pub-3940256099942544/5224354917';
    AdMob.prepareRewardVideoAd({ adId, isTesting: true });
  }

  ngOnInit() {
    this.type = getDataLocalStorage(APP_NAME_TYPE);
    this.status = getDataLocalStorage(APP_NAME_STATUS);
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.movieService.getMovie(paramMap.get('id')).subscribe(async (result: MovieResult) => {
        this.movie = result.movie;
        this.movie.director = this.movie.director.filter(d => d.trim());
        this.movie.actor = this.movie.actor.filter(a => a.trim());
        this.episodes = result.episodes[0].server_data;
        this.url = this.episodes[0].link_m3u8 || this.episodes[0].link_embed || this.movie?.trailer_url;

        this.content = parseHtmlToText(result.movie.content);
        this.showTimes = parseHtmlToText(result.movie.showtimes);

        if (this.movie?.trailer_url) {
          if (this.movie?.trailer_url.includes('youtu')) {
            //  https://www.youtube.com/watch?v=Vv-7epBIpqE     https://www.youtube.com/embed/Vv-7epBIpqE
            const trailerUrl = this.movie?.trailer_url.replace('watch?v=', 'embed/');
            this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl);
          } else {
            const modal = await this.modalCtrl.create({
              component: FullScreenComponent,
              componentProps: { url: this.movie?.trailer_url }
            });
            await modal.present();
          }
        }
        const category = this.movie?.category.map(c => c.name) || [];
        this.movieService.getRecommended(category).subscribe(res => {
          this.recommended = res.data as Movie[];
          if (this.swiperCrew) {
            this.swiperCrew.update();
          }
          if (this.swiperEpisode) {
            this.swiperEpisode.update();
          }
          if (this.swiperMore) {
            this.swiperMore.update();
          }
        });
      });
    });
  }

  addToFavorite() {
    (new LoggedInGuard(this.router, this.alertController)).canActivate();
  }

  async playFullScreen(url: string) {
    let modal: HTMLIonModalElement | HTMLIonAlertElement;
    if (this.url.includes('youtu')) {
      modal = await this.alertController.create({
        header: 'Phim chưa sẵn sàng',
        message: 'Bạn có muốn xem trailer trước không?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'OK',
            handler: () => {
              const trailer = document.getElementById(TRAILER_ID);
              trailer.scrollIntoView();
            }
          }
        ]
      });
    } else {
      modal = await this.modalCtrl.create({
        component: FullScreenComponent,
        componentProps: { url },
        cssClass: 'full-screen'
      });
    }
    await modal.present();
  }

  getStatusColor(status: string) {
    return getStatusColor(status);
  }

  getStatus(status: string) {
    return getStatus(status);
  }

  getCountries(countries: Country[]) {
    return countries?.map(c => c.name).join(', ');
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  async rewardVideo(): Promise<void> {
    // this.playFullScreen(this.url);
    AdMob.showRewardVideoAd();
  }

  async ionViewWillEnter() {
    /**
     * Run every time the Ad height changes.
     * AdMob cannot be displayed above the content, so create margin for AdMob.
     */
    const resizeHandler = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info: AdMobBannerSize) => {
      this.appMargin = info.height;
      const app: HTMLElement = document.querySelector('ion-router-outlet');
      if (this.appMargin === 0) {
        app.style.marginBottom = '';
        return;
      }
      if (this.appMargin > 0) {
        const body = document.querySelector('body');
        const bodyStyles = window.getComputedStyle(body);
        const safeAreaBottom = bodyStyles.getPropertyValue('--ion-safe-area-bottom');
        app.style.marginBottom = `calc(${safeAreaBottom} + ${this.appMargin}px)`;
      }
    });
    this.listenerHandlers.push(resizeHandler);
  }

  ionViewWillLeave() {
    this.listenerHandlers.forEach(handler => handler.remove());
  }
}
