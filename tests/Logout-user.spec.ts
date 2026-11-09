
import { test } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

test("Logout User", async ({ page }) => {
  const signupPage = new SignupPage(page);

  // 2. Przejście pdo strony
  await signupPage.open();

  // 3. Sprawdzenie czy strona główna jest widoczna
  await signupPage.expectHomePageVisible();

  // Obsługa okna zgody na cookies
  await signupPage.handleConsentIfVisible();

  // 4. Kliknięcie przycisku Signup/Login
  await signupPage.clickSignupLogin();

  // 6. Kliknięcie przycisku Login
  await signupPage.login("sabina@gmail.com", "Test123#");

  // 7. Sprawdzenie czy użytkownik został zalogowany
  await signupPage.expectLoggedInAsVisible("Sabina");

  // 8. Kliknięcie przycisku Logout
  await signupPage.logout();

  // 9. Sprawdzenie czy wyswietla się formularz logowania
  await signupPage.expectLoginHeadingVisible();
});
