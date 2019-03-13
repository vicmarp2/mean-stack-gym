import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  private courses: Course[] = [];
  private coursesUpdated = new Subject<{ courses: Course[] }>();

  getCourses() {
    return this.http
      .get<{ message: string; courses: any }>(
        BACKEND_URL
      )
      .pipe(
        map(coursesData => {
          return {
            courses: coursesData.courses.map(courses => {
              return {
                id: courses._id,
                name: courses.name,
                description: courses.description,
                imageUrl: courses.imageUrl,
              };
            }),
          };
        })
      )
      .subscribe(transformedCourseData => {
        this.courses = transformedCourseData.courses;
        this.coursesUpdated.next({
        courses: [...this.courses],
      });
    });
  }

  getCoursesUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  createCourse(course: any) {
    this.http.post<{message: string; course: any }>(BACKEND_URL + '/create', {course})
    .subscribe(
      (result) => {
        console.log(result);
      }
    );
  }

  updateCourse(course: Course) {
    return this.http.put<{ message: string; course: any }>(BACKEND_URL + '/edit', { course })
    .subscribe(result => {
      console.log(result);
    });
  }

  deleteCourse(id: string) {
    return this.http
      .delete(BACKEND_URL + '/' + id)
      .subscribe(result => {
        console.log(result);
      });
  }
}
