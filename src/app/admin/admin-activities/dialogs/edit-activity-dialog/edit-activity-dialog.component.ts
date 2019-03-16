import { Component, OnInit, Inject } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-activity-dialog',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.css']
})
export class EditActivityDialogComponent implements OnInit {

  activity: Activity;

  constructor(public dialogRef: MatDialogRef<EditActivityDialogComponent>,
    private activitiesService: ActivitiesService, @Inject(MAT_DIALOG_DATA) public data: { activity: Activity }) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.activitiesService.updateActivity(this.data.activity);
    this.dialogRef.close();
  }

}
