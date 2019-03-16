import { Component, OnInit, OnDestroy } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { DeleteActivityDialogComponent } from './dialogs/delete-activity-dialog/delete-activity-dialog.component';
import { EditActivityDialogComponent } from './dialogs/edit-activity-dialog/edit-activity-dialog.component';
import { CreateActivityDialogComponent } from './dialogs/create-activity-dialog/create-activity-dialog.component';

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivitiesComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<Activity>(true, []);
  activities: Activity[];
  private activitiesSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'imageUrl'];
  dataSource = new MatTableDataSource<Activity>(this.activities);
  constructor(private activitiesService: ActivitiesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.activitiesService.getActivities();
    this.activitiesSub = this.activitiesService.getActivitiesUpdateListener()
      .subscribe(transformedActivitiesData => {
        this.activities = transformedActivitiesData.activities;
        this.dataSource = new MatTableDataSource<Activity>(this.activities);
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
    const dialogRef = this.dialog.open(CreateActivityDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getActivities();
      this.selection.clear();
    });
  }

  openDeleteDialog() {
    const ids = [];
    this.selection.selected.forEach(activity => {
      ids.push(activity.id);
    });
    const dialogRef = this.dialog.open(DeleteActivityDialogComponent, {data: {ids}} );
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getActivities();
      this.selection.clear();
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditActivityDialogComponent, {data: {activity: this.selection.selected[0]}});
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getActivities();
      this.selection.clear();
    });
  }

  ngOnDestroy() {
    this.activitiesSub.unsubscribe();
  }
}
