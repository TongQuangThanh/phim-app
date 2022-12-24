import { SlideOption } from '../models/data';

export const APP_NAME = 'thnvn_phim_';
export const APP_NAME_TOKEN = APP_NAME + 'token';
export const APP_NAME_TYPE = APP_NAME + 'type';
export const APP_NAME_STATUS = APP_NAME + 'status';
export const APP_NAME_COUNTRY = APP_NAME + 'country';
export const APP_NAME_CATEGORY = APP_NAME + 'category';
export const APP_NAME_TYPE_ARR = APP_NAME + 'type_array';
export const APP_NAME_STATUS_ARR = APP_NAME + 'status_array';
export const APP_NAME_BANDWIDTH = APP_NAME + 'bandwidth';
export const APP_NAME_CATEGORY_SELECTED = APP_NAME + 'category_selected';

export const url = 'https://ophim1.com';
// export const internalURL = 'http://localhost:3080';
export const internalURL = 'https://thnvn-phim-zy3j.onrender.com';

export const PLAYER_ID = 'movie-player-id';
export const TRAILER_ID = 'trailer-player-id';

export const defaultShowChip = 5;
export const defaultLimit = 10;

export const adBannerIos = 'ca-app-pub-1861772573153532/5918343105';
export const adVideoIos = 'ca-app-pub-1861772573153532/4517631523';
export const adBannerAndroid = 'ca-app-pub-1861772573153532/5968683681';
export const adVideoAndroid = 'ca-app-pub-1861772573153532/8240689465';

export const type = [
  {
    key: 'series',
    url: 'phim-bo',
    title: 'Phim bộ'
  },
  {
    key: 'single',
    url: 'phim-le',
    title: 'Phim lẻ'
  },
  {
    key: 'hoathinh',
    url: 'hoat-hinh',
    title: 'Hoạt hình'
  },
  {
    key: 'tvshows',
    url: 'tv-shows',
    title: 'TV Shows'
  },
  {
    key: 'cinema',
    url: 'chieu-rap',
    title: 'Chiếu rạp'
  },
  {
    key: 'latest',
    url: 'moi-nhat',
    title: 'Mới nhất'
  }
];

export const slideOpts: SlideOption = {
  slidesPerView: 1.5,
  spaceBetween: 20,
  effect: 'fade',
  preloadImages: false,
  slidesOffsetAfter: 20,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2.5,
      // spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3.5,
      // spaceBetween: 25
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4.5,
      // spaceBetween: 30
    },
    // when window width is >= 720px
    720: {
      slidesPerView: 5.5,
      // spaceBetween: 35
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 6.5,
      // spaceBetween: 40
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 7.5,
      // spaceBetween: 45
    },
    // when window width is >= 1400px
    1400: {
      slidesPerView: 8.5,
      // spaceBetween: 50
    }
  }
};

// pw quangthanh94
// alias key0
