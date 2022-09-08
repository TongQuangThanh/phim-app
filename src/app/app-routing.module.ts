import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { GenreComponent } from './pages/genre/genre.component';
import { ListComponent } from './pages/list/list.component';
import { MovieComponent } from './pages/movie/movie.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'danh-sach/:id',
    component: ListComponent
  },
  {
    path: 'phim/:id',
    component: MovieComponent
  },
  {
    path: 'genre',
    component: GenreComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
