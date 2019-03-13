import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.css']
})
export class DeleteCourseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCourseDialogComponent>,
    private coursesService: CoursesService,  @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.coursesService.deleteCourse(id);
    });
    this.dialogRef.close();
  }
}
