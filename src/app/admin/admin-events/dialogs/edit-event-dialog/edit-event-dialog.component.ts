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

  constructor(public dialogRef: MatDialogRef<EditEventDialogComponent>,
    private activitiesService: ActivitiesService, @Inject(MAT_DIALOG_DATA) public data: { event: Event }) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.activitiesService.updateEvent(this.data.event);
    this.dialogRef.close();
  }

}
