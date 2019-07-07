import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymsService } from 'src/app/gyms/gyms.service';

@Component({
  selector: 'app-delete-gym-dialog',
  templateUrl: './delete-gym-dialog.component.html',
  styleUrls: ['./delete-gym-dialog.component.css']
})
export class DeleteGymDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteGymDialogComponent>,
    private gymsService: GymsService, @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.gymsService.deleteGym(id);
    });
    this.dialogRef.close();
  }
}
