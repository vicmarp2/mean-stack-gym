import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GymsService } from 'src/app/gyms/gyms.service';
import { Gym } from 'src/app/gyms/gym.model';

@Component({
  selector: 'app-create-gym-dialog',
  templateUrl: './create-gym-dialog.component.html',
  styleUrls: ['./create-gym-dialog.component.css']
})
export class CreateGymDialogComponent implements OnInit {

  gym: any = {};

  constructor(public dialogRef: MatDialogRef<CreateGymDialogComponent>,
    private gymsService: GymsService) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const newGym = {
      ...this.gym,
      openingHours: {
        mondayToFriday: this.gym.mondayToFriday,
        weekend: this.gym.weekend,
      },
      coordinates: {
        latitude: this.gym.latitude,
        longitude: this.gym.longitude,
      }
    };
    this.gymsService.createGym(newGym);
    this.dialogRef.close();
  }
}
