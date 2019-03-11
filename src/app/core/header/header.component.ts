import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth = false;
  userId: string;
  userIsAdmin: boolean;
  private authListener: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuth = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getUserAdmin();
    this.authListener = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getUserAdmin();
      });
  }

  onLogout() {
  this.authService.logout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
