import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ShopComponent } from './shop/shop.component';
import { QuotasComponent } from './quotas/quotas.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gyms', loadChildren: './gyms/gyms.module#GymsModule'},
  {path: 'courses', component: CoursesComponent},
  {path: 'quotas', component: QuotasComponent},
  {path: 'activities/at/:gym', component: ActivitiesComponent},
  {path: 'shop', component: ShopComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
