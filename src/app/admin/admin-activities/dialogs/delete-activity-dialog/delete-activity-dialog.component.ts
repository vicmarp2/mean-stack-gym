import { Component, OnInit, Inject } from '@angular/core';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.css']
})
export class DeleteActivityDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteActivityDialogComponent>,
    private activitiesService: ActivitiesService,  @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.activitiesService.deleteActivity(id);
    });
    this.dialogRef.close();
  }

}
