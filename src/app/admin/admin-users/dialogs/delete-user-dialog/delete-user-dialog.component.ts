import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.userService.deleteUser(id);
    });
    this.dialogRef.close();
  }
}
