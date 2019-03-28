import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/shared/models/activity.model';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent implements OnInit, OnDestroy {

  event: any = {};
  activities: Activity[];
  private activitiesSub: Subscription;

  constructor(public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.activitiesService.getActivities();
    this.activitiesSub = this.activitiesService.getActivitiesUpdateListener()
      .subscribe(transformedActivitiesData => {
        this.activities = transformedActivitiesData.activities;
      });
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const newEvent = {
      ...this.event,
    };
    this.activitiesService.createEvent(newEvent);
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.activitiesSub.unsubscribe();
  }
}
