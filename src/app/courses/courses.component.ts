import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from './course.model';
import { CoursesService } from './courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[];
  private coursesSub: Subscription;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.coursesService.getCourses();
    this.coursesSub = this.coursesService.getCoursesUpdateListener()
      .subscribe(transformedQoutasData => {
        this.courses = transformedQoutasData.courses;
      });
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }
}
