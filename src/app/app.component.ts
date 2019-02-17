import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  theme = 'light-theme';

  constructor(private authService: AuthService, private overlayContainer: OverlayContainer) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    // se cambia el tema del overlay del select
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
  onActivate() {
    window.scroll(0, 0);
  }

  onThemeChange(theme: string) {
    this.theme = theme;
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

}
