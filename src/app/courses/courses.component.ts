import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { CoursesService } from './courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  constructor(private coursesService: CoursesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

}
