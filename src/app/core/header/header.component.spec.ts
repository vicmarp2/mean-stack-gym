import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, TRANSLATIONS_FORMAT, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute, NavigationEnd, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let router: Router;
  let authService: AuthService;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule
    ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when onLogout is fired', fakeAsync(() => {
    spyOn(authService, 'logout').and.callThrough();
    component.onLogout();
    tick();
    expect(authService.logout).toHaveBeenCalled();
  }));


  it('should hide signup when already loged in', () => {
    spyOn(authService, 'getIsAuth').and.returnValue(true);
    spyOn(authService, 'getAuthStatusListener').and.returnValue(new Observable((observer: any) => {
      observer.next(true);
      observer.complete();
    }));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.signup-button'))).toBeNull();
  });

  it('should show user profile button when loged in', () => {
    spyOn(authService, 'getIsAuth').and.returnValue(true);
    spyOn(authService, 'getAuthStatusListener').and.returnValue(new Observable((observer: any) => {
      observer.next(true);
      observer.complete();
    }));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.user-profile-button'))).not.toBeNull();
  });

  it('should show admin button when loged in with admin', () => {
    spyOn(authService, 'getIsAuth').and.returnValue(true);
    spyOn(authService, 'getUserAdmin').and.returnValue(true);
    spyOn(authService, 'getAuthStatusListener').and.returnValue(new Observable((observer: any) => {
      observer.next(true);
      observer.complete();
    }));

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.admin-button'))).not.toBeNull();
  });

});
