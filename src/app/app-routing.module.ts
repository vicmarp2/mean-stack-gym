import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ShopComponent } from './shop/shop.component';
import { QuotasComponent } from './quotas/quotas.component';
import { TryfreeComponent } from './tryfree/tryfree.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gyms', loadChildren: './gyms/gyms.module#GymsModule'},
  {path: 'courses', component: CoursesComponent},
  {path: 'quotas', component: QuotasComponent},
  {path: 'activities/at/:gym', component: ActivitiesComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'tryfree', component: TryfreeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
