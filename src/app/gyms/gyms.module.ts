import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { AngularMaterialModule } from '../shared/angular-material.module';

import { FindGymComponent} from './find-gym/find-gym.component';
import { GymsRoutingModule} from './gyms-routing.module';
import { GymComponent } from './gym/gym.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FindGymComponent,
    GymComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyA2bsCQwBIZ-UEDOd5VmW3be6-q90L1lBY',
    }),
    GymsRoutingModule,
    SharedModule
  ],
})
export class GymsModule { }
