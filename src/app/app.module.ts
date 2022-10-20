import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor';
import { ErrorInterceptor } from './shared/interceptor/error-interceptor';
import { GenreComponent } from './pages/genre/genre.component';
import { ListComponent } from './pages/list/list.component';
import { MovieComponent } from './pages/movie/movie.component';
import { FullScreenComponent } from './pages/movie/full-screen/full-screen.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ErrorComponent, GenreComponent, MovieComponent, ListComponent, FullScreenComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxUiLoaderModule.forRoot({ maxTime: 2000 }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true, maxTime: 2000 })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
