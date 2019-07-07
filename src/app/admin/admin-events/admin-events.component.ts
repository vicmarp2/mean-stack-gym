import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Event } from 'src/app/shared/models/event.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { CreateEventDialogComponent } from './dialogs/create-event-dialog/create-event-dialog.component';
import { EditEventDialogComponent } from './dialogs/edit-event-dialog/edit-event-dialog.component';
import { DeleteEventDialogComponent } from './dialogs/delete-event-dialog/delete-event-dialog.component';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<Event>(true, []);
  events: Event[];
  private eventsSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'activityName', 'startHour', 'endHour', 'dayOfWeek'];
  dataSource = new MatTableDataSource<Event>(this.events);
  constructor(private activitiesService: ActivitiesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.activitiesService.getAllEvents();
    this.eventsSub = this.activitiesService.getEventsUpdateListener()
      .subscribe(transformedEventsData => {
        this.events = transformedEventsData.events;
        this.dataSource = new MatTableDataSource<Event>(this.events);
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
    const dialogRef = this.dialog.open(CreateEventDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getAllEvents();
      this.selection.clear();
    });
  }

  openDeleteDialog() {
    const ids = [];
    this.selection.selected.forEach(event => {
      ids.push(event.id);
    });
    const dialogRef = this.dialog.open(DeleteEventDialogComponent, {data: {ids}} );
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getAllEvents();
      this.selection.clear();
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {data: {event: this.selection.selected[0]}});
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getAllEvents();
      this.selection.clear();
    });
  }

  getDay(day: number) {
    let result: string;
    switch (day) {
      case 1: result = 'Lunes'; break;
      case 2: result = 'Martes'; break;
      case 3: result = 'Miércoles'; break;
      case 4: result = 'Jueves'; break;
      case 5: result = 'Viernes'; break;
      case 6: result = 'Sábado'; break;
      default: result = 'Domingo';
    }
    return result;
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
