import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Quota } from 'src/app/quotas/quota.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { CreateQuotaDialogComponent } from './dialogs/create-quota-dialog/create-quota-dialog.component';
import { DeleteQuotaDialogComponent } from './dialogs/delete-quota-dialog/delete-quota-dialog.component';
import { EditQuotaDialogComponent } from './dialogs/edit-quota-dialog/edit-quota-dialog.component';

@Component({
  selector: 'app-admin-quotas',
  templateUrl: './admin-quotas.component.html',
  styleUrls: ['./admin-quotas.component.css']
})
export class AdminQuotasComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<Quota>(true, []);
  quotas: Quota[];
  private quotasSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'title', 'numberOfPayments',
  'pricePerMonth', 'periodInMonths', 'isCardNeeded', 'cardPrice'];
  dataSource = new MatTableDataSource<Quota>(this.quotas);

  constructor(private quotasService: QuotasService, public dialog: MatDialog) { }

  ngOnInit() {
    this.quotasService.getQuotas();
    this.quotasSub = this.quotasService.getQuotasUpdateListener()
      .subscribe(transformedQuotasData => {
        this.quotas = transformedQuotasData.quotas;
        this.dataSource = new MatTableDataSource<Quota>(this.quotas);
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
    const dialogRef = this.dialog.open(CreateQuotaDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.quotasService.getQuotas();
      this.selection.clear();
    });
  }

  openDeleteDialog() {
    const ids = [];
    this.selection.selected.forEach(quota => {
      ids.push(quota.id);
    });
    const dialogRef = this.dialog.open(DeleteQuotaDialogComponent, {data: {ids}} );
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.quotasService.getQuotas();
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditQuotaDialogComponent, {data: {quota: this.selection.selected[0]}});
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.quotasService.getQuotas();
    });
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
