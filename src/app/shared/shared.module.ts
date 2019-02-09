import { NgModule } from '@angular/core';

import { FacilitiesComponent } from './facilities/facilities.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    FacilitiesComponent,
    TimetablesComponent,
  ],
  declarations: [FacilitiesComponent, TimetablesComponent]
})
export class SharedModule {}
