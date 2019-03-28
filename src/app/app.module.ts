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
import { CreateGymDialogComponent } from './admin/admin-gyms/dialogs/create-gym-dialog/create-gym-dialog.component';
import { EditGymDialogComponent } from './admin/admin-gyms/dialogs/edit-gym-dialog/edit-gym-dialog.component';
import { DeleteGymDialogComponent } from './admin/admin-gyms/dialogs/delete-gym-dialog/delete-gym-dialog.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { CreateCourseDialogComponent } from './admin/admin-courses/dialogs/create-course-dialog/create-course-dialog.component';
import { EditCourseDialogComponent } from './admin/admin-courses/dialogs/edit-course-dialog/edit-course-dialog.component';
import { DeleteCourseDialogComponent } from './admin/admin-courses/dialogs/delete-course-dialog/delete-course-dialog.component';
import { AdminActivitiesComponent } from './admin/admin-activities/admin-activities.component';
import { CreateActivityDialogComponent } from './admin/admin-activities/dialogs/create-activity-dialog/create-activity-dialog.component';
import { EditActivityDialogComponent } from './admin/admin-activities/dialogs/edit-activity-dialog/edit-activity-dialog.component';
import { DeleteActivityDialogComponent } from './admin/admin-activities/dialogs/delete-activity-dialog/delete-activity-dialog.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { CreateUserDialogComponent } from './admin/admin-users/dialogs/create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from './admin/admin-users/dialogs/edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './admin/admin-users/dialogs/delete-user-dialog/delete-user-dialog.component';
import { AdminQuotasComponent } from './admin/admin-quotas/admin-quotas.component';
import { CreateQuotaDialogComponent } from './admin/admin-quotas/dialogs/create-quota-dialog/create-quota-dialog.component';
import { EditQuotaDialogComponent } from './admin/admin-quotas/dialogs/edit-quota-dialog/edit-quota-dialog.component';
import { DeleteQuotaDialogComponent } from './admin/admin-quotas/dialogs/delete-quota-dialog/delete-quota-dialog.component';
import { ErrorInterceptor } from './error-interceptor';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { CreateEventDialogComponent } from './admin/admin-events/dialogs/create-event-dialog/create-event-dialog.component';
import { EditEventDialogComponent } from './admin/admin-events/dialogs/edit-event-dialog/edit-event-dialog.component';
import { DeleteEventDialogComponent } from './admin/admin-events/dialogs/delete-event-dialog/delete-event-dialog.component';


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
    CreateGymDialogComponent,
    EditGymDialogComponent,
    DeleteGymDialogComponent,
    AdminCoursesComponent,
    CreateCourseDialogComponent,
    EditCourseDialogComponent,
    DeleteCourseDialogComponent,
    AdminActivitiesComponent,
    CreateActivityDialogComponent,
    EditActivityDialogComponent,
    DeleteActivityDialogComponent,
    AdminUsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AdminQuotasComponent,
    CreateQuotaDialogComponent,
    EditQuotaDialogComponent,
    DeleteQuotaDialogComponent,
    AdminEventsComponent,
    CreateEventDialogComponent,
    EditEventDialogComponent,
    DeleteEventDialogComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeregisterDialogComponent,
    RenewDialogComponent,
    CreateGymDialogComponent,
    EditGymDialogComponent,
    DeleteGymDialogComponent,
    CreateCourseDialogComponent,
    EditCourseDialogComponent,
    DeleteCourseDialogComponent,
    CreateActivityDialogComponent,
    EditActivityDialogComponent,
    DeleteActivityDialogComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    CreateQuotaDialogComponent,
    EditQuotaDialogComponent,
    DeleteQuotaDialogComponent,
    CreateEventDialogComponent,
    EditEventDialogComponent,
    DeleteEventDialogComponent,
  ]
})
export class AppModule { }
