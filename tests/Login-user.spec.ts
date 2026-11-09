import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

test("Login User with correct email and password", async ({ page }) => {
  const signupPage = new SignupPage(page);

  // 2. Przejście do strony
  await signupPage.open();

  // 3. Sprawdź, czy strona główna jest poprawnie widoczna
  await signupPage.handleConsentIfVisible();
  await signupPage.expectHomePageVisible();

  // 4. Kliknij przycisk 'Signup / Login'
  await signupPage.clickSignupLogin();

  // 5. Sprawdź, czy widoczny jest napis 'Login to your account'
  await signupPage.expectLoginHeadingVisible();

  // 6–7. Wprowadź poprawny e-mail i hasło
  await signupPage.login("sabina@gmail.com", "Test123#");

  // 8. Sprawdź, czy użytkownik jest zalogowany
  await signupPage.expectLoggedInAsVisible("Sabina");
});