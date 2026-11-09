
import { test } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

test("Register User with existing email", async ({ page }) => {
  const signupPage = new SignupPage(page);

  // 2. Przejście do strony
  await signupPage.open();

  // 3. Sprawdzenie, czy strona główna jest widoczna
  await signupPage.expectHomePageVisible();

  // Obsługa okna zgody na cookies
  await signupPage.handleConsentIfVisible();

  // 4. Kliknięcie przycisku Signup/Login
  await signupPage.clickSignupLogin();

  // 6. Kliknięcie przycisku Signup
  await signupPage.registerInitialDetails(
    "Sabina",
    "sabina@gmail.com",
  );

  // 7. Sprawdzenie komunikatu o istniejącym adresie e-mail
  await signupPage.expectSignupErrorVisible();
});
