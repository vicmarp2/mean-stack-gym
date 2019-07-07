import { browser, by, element } from 'protractor';

export class AuthPage {

  navigateToLogin() {
    return browser.get('/auth/login');
  }

  getLoginButton() {
    return element(by.id('login'));
  }

  getInputUserNameLogin() {
    return element(by.css('input[name=email]'));
  }

  getInputPasswordLogin() {
    return element(by.css('input[name=password]'));
  }

  getSendLoginButton() {
    return element(by.css('button[type=submit]'));
  }

  navigateToUser() {
    return browser.get('/user/5c8165f432e1ad76c969a7ac');
  }

  navigateToActivities() {
    return browser.get('/activities/at/any');
  }
  getLogoutButton() {
    return element(by.id('logout'));
  }

  getMenuButton() {
    return element(by.id('menu-button'));
  }

  getMobileLogoutButton() {
    return element(by.id('mobile-logout'));
  }
}
