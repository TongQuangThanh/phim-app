import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Country, Movie, MovieResult, ServerData } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { getDataLocalStorage, getStatus, getStatusColor, setVideoPlayer } from 'src/app/shared/common/utils';
import { APP_NAME_STATUS, APP_NAME_TYPE, PLAYER_ID, slideOpts, TRAILER_ID } from 'src/app/shared/common/const';
import { YoutubePlayer } from 'capacitor-youtube-player'; // Web version
import { LoggedInGuard } from 'src/app/shared/guards/canActive';
import { FullScreenComponent } from './full-screen/full-screen.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  @ViewChild('crew', { static: false }) swiperCrew?: IonSlides;
  @ViewChild('episode', { static: false }) swiperEpisode?: IonSlides;
  @ViewChild('more', { static: false }) swiperMore?: IonSlides;
  slug = '';
  isPlaying = false;
  movie: Movie;
  episodes: ServerData[];
  showTimes = '';
  content = '';
  showAllContent = false;
  videoPlayer: any = {};
  slideOpts = slideOpts;
  playerId = PLAYER_ID;
  trailerId = TRAILER_ID;
  type: any = {};
  status: any = [];
  segment = 'more';
  url = '';
  dataLoaded = false;
  counter = 0;
  loadingText = 'Đang tải dữ liệu...';
  recommended: Movie[] = [];
  private handlerPlay: any;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.slideOpts);
    this.type = getDataLocalStorage(APP_NAME_TYPE);
    this.status = getDataLocalStorage(APP_NAME_STATUS);
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get('id');
      this.movieService.getMovie(this.slug).subscribe(async (result: MovieResult) => {
        this.movie = result.movie;
        this.movie.director = this.movie.director.filter(d => d.trim());
        this.movie.actor = this.movie.actor.filter(a => a.trim());
        this.episodes = result.episodes[0].server_data;
        this.url = this.episodes[0].link_m3u8 || this.episodes[0].link_embed || this.movie?.trailer_url;
        console.log(this.episodes);


        this.parseHtmlToText(result.movie.content, true);
        this.parseHtmlToText(result.movie.showtimes);

        const player: any = await setVideoPlayer();
        this.videoPlayer = player.plugin;
        this.handlerPlay = await this.videoPlayer.addListener('jeepCapVideoPlayerPlay', () => this.isPlaying = true, false);
        this.initPlayer(this.url, PLAYER_ID, 1, 3);
        this.loadingText = 'Khởi tạo trình xem phim...';
        if (this.movie?.trailer_url) {
          if (this.movie?.trailer_url.includes('youtu')) {
            this.initYoutubePlayer(TRAILER_ID, this.movie?.trailer_url.split('v=')[1], true);
          } else {
            this.initPlayer(this.movie?.trailer_url, TRAILER_ID, 3, 9);
          }
        }
        const category = this.movie?.category.map(c => c.name) || [];
        this.movieService.getRecommended(category).subscribe(res => {
          this.recommended = res.data as Movie[];
          this.swiperCrew.update();
          this.swiperEpisode.update();
          this.swiperMore.update();
        });
      });
    });
  }

  parseHtmlToText(html: string, isContent?: boolean) {
    const span = document.createElement('span');
    span.innerHTML = html;
    if (isContent) {
      this.content = span.textContent || span.innerText;
    } else {
      this.showTimes = span.textContent || span.innerText;
    }
  }

  async initYoutubePlayer(playerId: string, videoId: string, isTrailer?: boolean) {
    await YoutubePlayer.initialize({
      playerId, videoId,
      playerSize: {
        width: document.body.clientWidth - (isTrailer ? 32 : 0),
        height: document.body.clientHeight / (isTrailer ? 4 : 3)
      }
    });
  }

  async initPlayer(url: string, playerId: string, widthRate: number, heightRate: number) {
    await this.videoPlayer.initPlayer({
      mode: 'embedded', url, playerId, componentTag: 'app-movie',
      width: document.body.clientWidth / widthRate, height: document.body.clientHeight / heightRate
    });
    this.dataLoaded = true;
  }

  addToFavorite() {
    (new LoggedInGuard(this.router, this.alertController)).canActivate();
  }

  async play(isTrailer?: boolean) {
    if (this.url.includes('youtu')) {
      const alert = await this.alertController.create({
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
      await alert.present();
    } else {
      this.videoPlayer.play({ playerId: isTrailer ? TRAILER_ID : PLAYER_ID });
    }
  }

  async playFullScreen(url: string) {
    const modal = await this.modalCtrl.create({
      component: FullScreenComponent,
      componentProps: { url }
    });
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

  async ngOnDestroy() {
    await this.videoPlayer.stopAllPlayers();
    this.handlerPlay.remove();
  }
}
