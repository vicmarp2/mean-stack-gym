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

  daysOfWeek = [
    {number: 1, string: 'Lunes'},
    {number: 2, string: 'Martes'},
    {number: 3, string: 'Miércoles'},
    {number: 4, string: 'Jueves'},
    {number: 5, string: 'Viernes'},
    {number: 6, string: 'Sábado'},
    {number: 0, string: 'Domingo'},
  ];
  startHours: Array<number> = [];
  endHours: Array<number> = [];
  showHourError = false;
  constructor(public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private activitiesService: ActivitiesService) { }

  ngOnInit() {
    for (let i = 6; i < 22; i++) {
      this.startHours.push(i);
      this.endHours.push(i + 1);
    }
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
    this.showHourError = false;
    if (this.event.startHour >= this.event.endHour) {
      this.showHourError = true;
      return;
    }
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
