import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ShopComponent } from './shop/shop.component';
import { QuotasComponent } from './quotas/quotas.component';
import { TryfreeComponent } from './auth/tryfree/tryfree.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupGuard } from './auth/signup.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gyms', loadChildren: './gyms/gyms.module#GymsModule'},
  {path: 'courses', component: CoursesComponent},
  {path: 'quotas', component: QuotasComponent},
  {path: 'activities/at/:gym', component: ActivitiesComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'tryfree', component: TryfreeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent, canActivate: [SignupGuard]},
  {path: 'user/:userId', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    SignupGuard,
    AdminGuard,
  ]
})
export class AppRoutingModule { }
