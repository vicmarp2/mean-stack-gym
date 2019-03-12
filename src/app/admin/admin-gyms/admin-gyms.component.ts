import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Gym } from 'src/app/gyms/gym.model';
import { GymsService } from 'src/app/gyms/gyms.service';

@Component({
  selector: 'app-admin-gyms',
  templateUrl: './admin-gyms.component.html',
  styleUrls: ['./admin-gyms.component.css']
})
export class AdminGymsComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<Gym>(true, []);
  gyms: Gym[];
  private gymsSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'codName', 'name', 'address', 'contactNumber', 'openingHours', 'coordinates'];
  dataSource = new MatTableDataSource<Gym>(this.gyms);

  constructor(private gymsService: GymsService) { }

  ngOnInit() {
    this.gymsService.getGyms();
    this.gymsSub = this.gymsService.getGymsUpdateListener()
      .subscribe(transformedGymData => {
      this.gyms = transformedGymData.gyms;
      this.dataSource = new MatTableDataSource<Gym>(this.gyms);
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

  ngOnDestroy() {
    this.gymsSub.unsubscribe();
  }
}
