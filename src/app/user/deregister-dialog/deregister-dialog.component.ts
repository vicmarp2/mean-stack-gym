import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deregister-dialog',
  templateUrl: './deregister-dialog.component.html',
  styleUrls: ['./deregister-dialog.component.css']
})
export class DeregisterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeregisterDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
