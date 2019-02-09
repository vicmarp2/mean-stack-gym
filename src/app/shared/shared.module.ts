import { NgModule } from '@angular/core';

import { FacilitiesComponent } from './facilities/facilities.component';
import { TimetablesComponent } from './timetables/timetables.component';

@NgModule({
  exports: [
    FacilitiesComponent,
    TimetablesComponent,
  ],
  declarations: [FacilitiesComponent, TimetablesComponent]
})
export class SharedModule {}
