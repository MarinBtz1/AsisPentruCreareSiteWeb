import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { ListPageComponent } from './pages/list/list';
import { DetailsPageComponent } from './pages/details/details';
import { AboutPageComponent } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'list', component: ListPageComponent },
  { path: 'details/:id', component: DetailsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: '' }
];
