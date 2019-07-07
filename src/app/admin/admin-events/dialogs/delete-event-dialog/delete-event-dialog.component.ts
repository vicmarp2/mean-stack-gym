import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.css']
})
export class DeleteEventDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEventDialogComponent>,
    private activitiesService: ActivitiesService,  @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.activitiesService.deleteEvent(id);
    });
    this.dialogRef.close();
  }

}
