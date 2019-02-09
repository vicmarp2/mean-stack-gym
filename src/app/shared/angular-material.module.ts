import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
} from '@angular/material';

import { MatListModule } from '@angular/material/list';
import { FacilitiesComponent } from './facilities/facilities.component';
import { TimetablesComponent } from './timetables/timetables.component';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
  ],
  declarations: [FacilitiesComponent, TimetablesComponent]
})
export class AngularMaterialModule {}
