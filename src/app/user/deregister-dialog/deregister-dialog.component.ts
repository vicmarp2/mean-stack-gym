import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-deregister-dialog',
  templateUrl: './deregister-dialog.component.html',
  styleUrls: ['./deregister-dialog.component.css']
})
export class DeregisterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeregisterDialogComponent>, private authService: AuthService,
    private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { userId: string }) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.userService.deleteUser(this.data.userId);
    this.authService.logout();
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
