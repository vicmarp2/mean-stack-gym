import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth = true;
  userId: string = 'dddd';
  private authListener: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.userIsAuth = this.authService.getIsAuth();
    // this.userId = this.authService.getUserId();
    // this.authListener = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuth = isAuthenticated;
    //     this.userId = this.authService.getUserId();
    //   });
  }

  onLogout() {
  this.authService.logout();
  this.userIsAuth = false;
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
