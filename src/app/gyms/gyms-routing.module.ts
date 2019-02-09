import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindGymComponent } from './find-gym/find-gym.component';

const gymsRoutes: Routes = [
  { path: '', component: FindGymComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(gymsRoutes)
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class GymsRoutingModule {}
