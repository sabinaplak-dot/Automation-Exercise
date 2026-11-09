
import { test } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

test("Login User with incorrect email and password", async ({ page }) => {
  const signupPage = new SignupPage(page);

  // 2. Przejście do strony
  await signupPage.open();

  // 3. Sprawdzenie, czy strona główna jest widoczna
  await signupPage.expectHomePageVisible();

  // Obsługa okna zgody na cookies
  await signupPage.handleConsentIfVisible();

  // 4. Kliknięcie przycisku Signup/Login
  await signupPage.clickSignupLogin();

  // 5. Sprawdzenie, czy nagłówek logowania jest widoczny
  await signupPage.expectLoginHeadingVisible();

  // 6. Wprowadzenie nieprawidłowego adresu e-mail i hasła
  // 7. Kliknięcie przycisku Login
  await signupPage.login("bledny-test@mail.com", "Test123#");

  // 8. Sprawdzenie, czy wyświetla się komunikat o błędnych danych logowania
  await signupPage.expectLoginErrorVisible();
});
