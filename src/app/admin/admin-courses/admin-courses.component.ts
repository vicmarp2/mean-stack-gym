import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/courses/course.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { CoursesService } from 'src/app/courses/courses.service';
import { CreateCourseDialogComponent } from './dialogs/create-course-dialog/create-course-dialog.component';
import { DeleteCourseDialogComponent } from './dialogs/delete-course-dialog/delete-course-dialog.component';
import { EditCourseDialogComponent } from './dialogs/edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<Course>(true, []);
  courses: Course[];
  private coursesSub: Subscription;
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'imageUrl'];
  dataSource = new MatTableDataSource<Course>(this.courses);

  constructor(private coursesService: CoursesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.coursesService.getCourses();
    this.coursesSub = this.coursesService.getCoursesUpdateListener()
      .subscribe(transformedCoursesData => {
        this.courses = transformedCoursesData.courses;
        this.dataSource = new MatTableDataSource<Course>(this.courses);
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
    const dialogRef = this.dialog.open(CreateCourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.coursesService.getCourses();
      this.selection.clear();
    });
  }

  openDeleteDialog() {
    const ids = [];
    this.selection.selected.forEach(course => {
      ids.push(course.id);
    });
    const dialogRef = this.dialog.open(DeleteCourseDialogComponent, {data: {ids}} );
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.coursesService.getCourses();
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {data: {course: this.selection.selected[0]}});
    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      this.coursesService.getCourses();
    });
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }
}
