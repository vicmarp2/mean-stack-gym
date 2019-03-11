import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Quota } from '../quotas/quota.model';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }


  checkDuplicatedUser(email: string) {
    return this.http.post<{ duplicated: boolean }>(BACKEND_URL + '/duplicate', { email })
      .pipe(
        map(data => {
          return data.duplicated;
        })
      );
  }

  checkDuplicatedDNI(dni: string) {
    return this.http.post<{ duplicated: boolean }>(BACKEND_URL + '/duplicate/dni', { dni })
      .pipe(
        map(data => {
          return data.duplicated;
        })
      );
  }


  getUsers() {

  }

  updateUser(user: User) {
    return this.http.put<{ message: string; user: any }>(BACKEND_URL + '/edit', { user })
    .subscribe(result => {
      console.log(result);
    });
  }

  getUser(userId: string) {
    return this.http
      .get<{ message: string; user: any }>(
        `${BACKEND_URL}/user/${userId}`
      )
      .pipe(
        map(userData => {
          return {
            id: userData.user._id,
            ...userData.user,
          };
        }));
  }

  deleteUser(userId: string) {
    return this.http
      .delete(BACKEND_URL + '/user/' + userId)
      .subscribe(result => {
        console.log(result);
      });
  }
}
