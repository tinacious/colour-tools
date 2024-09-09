import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShadesGeneratorComponent } from './shades-generator/shades-generator.component';
import { PalettesComponent } from './palettes/palettes.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shades',
    component: ShadesGeneratorComponent,
  },
  {
    path: 'palettes',
    component: PalettesComponent,
  },
];
