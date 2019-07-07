import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

describe('Router tests', () => {
  let authService: AuthService;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppModule
      ]
    });

    authService = TestBed.get(AuthService);
  });

  // specs
  it('can navigate to login', fakeAsync(() => {
    TestBed.get(Router).navigate(['/auth/login']);

    tick();
    expect(location.pathname.endsWith('/auth/login')).toBe(true);
  }));

  it('should redirect home by default path', fakeAsync(() => {
    TestBed.get(Router).navigate(['/']);

    tick();
    expect(location.pathname.endsWith('/')).toBe(true);
  }));

  it('should redirect login if not authorized', fakeAsync(() => {
    authService.setIsAuth(false);
    TestBed.get(Router).navigate(['/admin']);

    tick();
    expect(location.pathname.endsWith('/auth/login')).toBe(true);

  }));

  it('should not navigate to signup when registered', fakeAsync(() => {
    authService.setIsAuth(true);
    TestBed.get(Router).navigate(['/auth/signup']);

    tick();
    expect(location.pathname.endsWith('/auth/signup')).toBe(false);
  }));

});
