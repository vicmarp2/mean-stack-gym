import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from 'src/app/user/user.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { CreateUserDialogComponent } from './dialogs/create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  selection = new SelectionModel<User>(true, []);
  users: User[];
  private usersSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'dni', 'email', 'name', 'surname',
  'quota', 'purchaseDate', 'endDate', 'contactNumber', 'birthdate', 'address', 'iban', 'isAdmin'];

  dataSource = new MatTableDataSource<User>(this.users);
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener()
      .subscribe(transformedUserData => {
      this.users = transformedUserData.users;
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  multipleSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected > 1;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers();
      this.selection.clear();
    });
  }

  openDeleteDialog() {
    const ids = [];
    this.selection.selected.forEach(user => {
      ids.push(user.id);
    });
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {data: {ids}} );
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.userService.getUsers();
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: {user: this.selection.selected[0]}});
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.userService.getUsers();
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
