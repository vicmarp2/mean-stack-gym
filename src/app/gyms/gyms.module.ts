import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindGymComponent} from './find-gym/find-gym.component';
import { GymsRoutingModule} from './gyms-routing.module';

@NgModule({
  declarations: [
    FindGymComponent,
  ],
  imports: [
    CommonModule,
    GymsRoutingModule,
  ],
})
export class GymsModule { }
