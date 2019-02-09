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
import { ActiviesComponent } from './activies/activies.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activities/activity/activity.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ActiviesComponent,
    ActivitiesComponent,
    ActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlideshowModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
