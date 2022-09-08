import { Movie } from './movie';

export interface Data {
  category: string[];
  country: string[];
  type: string[];
  status: string[];
  quality: string[];
  lang: string[];
  year: string[];
}

export interface InternalPageResult {
  movies: Movie[];
  allPage: number;
}

export interface HomeResult {
  message: string;
  data?: {
    series: Movie[];
    single: Movie[];
    latest: Movie[];
    hoathinh: Movie[];
    tvshows: Movie[];
    cinema: Movie[];
  };
}

export interface DataResult {
  message: string;
  data?: string | Movie | Movie[] | InternalPageResult;
}

export interface SlideOption {
  slidesPerView: number | string;
  spaceBetween?: number;
  effect?: string;
  preloadImages?: boolean;
  slidesOffsetAfter: number;
  breakpoints?: {
    320?: {
      slidesPerView: number;
    };
    // when window width is >= 480px
    480?: {
      slidesPerView: 3.5;
    };
    // when window width is >= 640px
    640?: {
      slidesPerView: 4.5;
    };
    // when window width is >= 720px
    720?: {
      slidesPerView: 5.5;
    };
    // when window width is >= 992px
    992?: {
      slidesPerView: 6.5;
    };
    // when window width is >= 1200px
    1200?: {
      slidesPerView: 7.5;
    };
    // when window width is >= 1400px
    1400?: {
      slidesPerView: 8.5;
    };
  };
}
