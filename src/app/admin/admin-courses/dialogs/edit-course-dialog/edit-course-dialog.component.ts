import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoursesService } from 'src/app/courses/courses.service';
import { Course } from 'src/app/courses/course.model';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {

  course: Course;

  constructor(public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private coursesService: CoursesService, @Inject(MAT_DIALOG_DATA) public data: { course: Course }) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.coursesService.updateCourse(this.data.course);
    this.dialogRef.close();
  }
}
