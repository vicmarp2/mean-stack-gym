import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { AngularMaterialModule } from '../shared/angular-material.module';

import { FindGymComponent} from './find-gym/find-gym.component';
import { GymsRoutingModule} from './gyms-routing.module';


@NgModule({
  declarations: [
    FindGymComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyA2bsCQwBIZ-UEDOd5VmW3be6-q90L1lBY',
    }),
    GymsRoutingModule,
  ],
})
export class GymsModule { }
