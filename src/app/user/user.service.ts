import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[] }>();

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
    return this.http
    .get<{ message: string; users: any }>(
      BACKEND_URL
    )
    .pipe(
      map(usersData => {
        return {
          users: usersData.users.map(users => {
            return {
              id: users._id,
              ...users
            };
          }),
        };
      })
    )
    .subscribe(transformedUserData => {
      this.users = transformedUserData.users;
      this.usersUpdated.next({
      users: [...this.users],
    });
  });
}

getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}

  updateUser(user: User, emailChanged: boolean = false) {
    return this.http.put<{ message: string; user: any }>(BACKEND_URL + '/edit', { user, emailChanged })
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
