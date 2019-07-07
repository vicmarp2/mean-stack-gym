import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent implements OnInit {

  event: Event;

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

  constructor(public dialogRef: MatDialogRef<EditEventDialogComponent>,
    private activitiesService: ActivitiesService, @Inject(MAT_DIALOG_DATA) public data: { event: Event }) { }

  ngOnInit() {
    for (let i = 6; i < 22; i++) {
      this.startHours.push(i);
      this.endHours.push(i + 1);
    }
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.showHourError = false;
    if (this.data.event.startHour >= this.data.event.endHour) {
      this.showHourError = true;
      return;
    }
    this.activitiesService.updateEvent(this.data.event);
    this.dialogRef.close();
  }

}
