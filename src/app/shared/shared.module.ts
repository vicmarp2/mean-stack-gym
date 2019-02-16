import { NgModule } from '@angular/core';

import { FacilitiesComponent } from './components/facilities/facilities.component';
import { TimetablesComponent } from './components/timetables/timetables.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    FacilitiesComponent,
    TimetablesComponent,
  ],
  declarations: [FacilitiesComponent, TimetablesComponent]
})
export class SharedModule {}
