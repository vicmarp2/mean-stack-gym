import { browser } from 'protractor';
import { AuthPage } from './auth.po';

describe('Auth App Desktop', () => {
  let page: AuthPage;

  beforeAll(() => {
    // browser.restart();
    page = new AuthPage();
  });

  it('Should login when you click on login and navigate to the user area', async () => {
     // LOGIN
     page.navigateToLogin();
     await browser.driver.navigate().refresh();
     page.getInputUserNameLogin().sendKeys('v41196@gmail.com');
     page.getInputPasswordLogin().sendKeys('palabra');
     await page.getSendLoginButton().click();
     // Redirige al login
    browser.waitForAngularEnabled(false);
    browser.sleep(2000);
     browser.getCurrentUrl().then((urlUser => {
       expect(urlUser).toContain('/user/5c8165f432e1ad76c969a7ac');
     }));

  });

  it('Should navigate to activities', async () => {
    await page.navigateToActivities();
    browser.sleep(2000);
    browser.getCurrentUrl().then((urlActivities => {
      expect(urlActivities).toContain('/activities/at/any');
    }));
  });

  it('Should logout when you click on logout', async () => {
    await page.getLogoutButton().click();
    browser.getCurrentUrl().then((urlHome) => {
      expect(urlHome).toContain('/');
    });
    // No puede redirigir a explorer
    await page.navigateToUser();
    browser.getCurrentUrl().then((urlHome) => {
      expect(urlHome).toContain('/');
    });
  });
});
