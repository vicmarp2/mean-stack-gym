import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymsService } from 'src/app/gyms/gyms.service';
import { Gym } from 'src/app/gyms/gym.model';

@Component({
  selector: 'app-edit-gym-dialog',
  templateUrl: './edit-gym-dialog.component.html',
  styleUrls: ['./edit-gym-dialog.component.css']
})
export class EditGymDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditGymDialogComponent>,
    private gymsService: GymsService, @Inject(MAT_DIALOG_DATA) public data: { gym: Gym }) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.gymsService.updateGym(this.data.gym);
    this.dialogRef.close();
  }
}
