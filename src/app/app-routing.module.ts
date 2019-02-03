import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gyms', loadChildren: './gyms/gyms.module#GymsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
