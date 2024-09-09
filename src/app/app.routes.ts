import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShadesGeneratorComponent } from './shades-generator/shades-generator.component';
import { PalettesComponent } from './palettes/palettes.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'shades',
    pathMatch: 'full',
    component: ShadesGeneratorComponent,
  },
  {
    path: 'palettes',
    pathMatch: 'full',
    component: PalettesComponent,
  },
];
