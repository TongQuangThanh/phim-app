import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/shared/guards/canActive';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoritePageModule),
        canLoad: [LoggedInGuard]
      },
      {
        path: 'download',
        loadChildren: () => import('./download/download.module').then(m => m.DownloadPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
