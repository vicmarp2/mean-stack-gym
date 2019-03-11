import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Gym } from 'src/app/gyms/gym.model';
import { GymsService } from 'src/app/gyms/gyms.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


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
  // 'contactNumber', 'openingHours', 'coordinates'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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

/** An example database that the data source uses to retrieve data for the table. */
export class AdminGymsDatabase {
  constructor(private gymsService: GymsService) {}

  getGyms(): Observable<{ gyms: any }> {
    return this.gymsService.getGymsForDatabase();
  }
}
