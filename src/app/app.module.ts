import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {SlideshowModule} from 'ng-simple-slideshow';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './shared/angular-material.module';


import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CoursesComponent } from './courses/courses.component';
import { SharedModule } from './shared/shared.module';
import { ShopComponent } from './shop/shop.component';
import { QuotasComponent } from './quotas/quotas.component';
import { TryfreeComponent } from './auth/tryfree/tryfree.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DeregisterDialogComponent } from './user/deregister-dialog/deregister-dialog.component';
import { RenewDialogComponent } from './user/renew-dialog/renew-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGymsComponent } from './admin/admin-gyms/admin-gyms.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ActivitiesComponent,
    CoursesComponent,
    ShopComponent,
    QuotasComponent,
    TryfreeComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    DeregisterDialogComponent,
    RenewDialogComponent,
    AdminComponent,
    AdminGymsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlideshowModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeregisterDialogComponent,
    RenewDialogComponent,
  ]
})
export class AppModule { }
