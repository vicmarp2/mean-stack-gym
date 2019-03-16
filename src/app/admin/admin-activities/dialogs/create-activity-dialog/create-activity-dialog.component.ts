import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';

@Component({
  selector: 'app-create-activity-dialog',
  templateUrl: './create-activity-dialog.component.html',
  styleUrls: ['./create-activity-dialog.component.css']
})
export class CreateActivityDialogComponent implements OnInit {

  activity: any = {};

  constructor(public dialogRef: MatDialogRef<CreateActivityDialogComponent>,
    private activitiesService: ActivitiesService) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const newActivity = {
      ...this.activity,
    };
    this.activitiesService.createActivity(newActivity);
    this.dialogRef.close();
  }

}
