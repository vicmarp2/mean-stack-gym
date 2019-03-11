import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../user/user.model';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userAdmin: boolean;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserAdmin() {
    return this.userAdmin;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(user: User) {
    this.http.post<{message: string; user: any }>(BACKEND_URL + '/signup', user)
    .subscribe(
      (result) => {
        this.login(user.email, user.password);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  createFreeUser(user: any) {
    this.http.post<{message: string; user: any }>(BACKEND_URL + '/signup/free', user)
    .subscribe(
      (result) => {
        this.login(user.email, user.password);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string; userAdmin: boolean }>(
        BACKEND_URL + '/login',
        {email, password}
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userAdmin = response.userAdmin;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId, this.userAdmin);
            if (this.userAdmin) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate([`/user/${this.userId}`]);
            }
          }
        },
        error => {
          this.authStatusListener.next(false);
          this.router.navigate(['auth/login'], { queryParams: { auth: 'invalid'}});
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userAdmin = authInformation.userAdmin;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userAdmin = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userAdmin: boolean) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userAdmin', JSON.stringify(userAdmin));

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userAdmin');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));
    console.log(userAdmin);
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userAdmin: userAdmin,
    };
  }
}
