import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses/courses.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.css']
})
export class CreateCourseDialogComponent implements OnInit {

  course: any = {};

  constructor(public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    private coursesService: CoursesService) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const newCourse = {
      ...this.course,
    };
    this.coursesService.createCourse(newCourse);
    this.dialogRef.close();
  }
}
