
import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";
import { generateUserData, accountDetails } from "./test-data";

test("Login User with correct email and password", async ({ page }) => {
  const signupPage = new SignupPage(page);
  const user = generateUserData();

  // 2. Przejdź do strony
  await signupPage.open();

  // 3. Sprawdź, czy strona główna jest poprawnie widoczna
  await signupPage.handleConsentIfVisible();
  await signupPage.expectHomePageVisible();

  // Przygotowanie konta użytkownika
  await signupPage.clickSignupLogin();
  await signupPage.expectNewUserSignupVisible();
  await signupPage.registerInitialDetails(user.name, user.email);
  await signupPage.expectAccountInformationVisible();
  await signupPage.fillAccountInformation({
    ...accountDetails,
    password: user.password,
  });
  await signupPage.createAccount();
  await signupPage.expectAccountCreatedVisible();
  await signupPage.continue();

  // Wylogowanie użytkownika
  await signupPage.clickSignupLogin();

  // 4. Kliknij przycisk 'Signup / Login'
  // 5. Sprawdź, czy widoczny jest napis 'Login to your account'
  await signupPage.expectLoginHeadingVisible();

  // 6–7. Wprowadź poprawny e-mail i hasło, a następnie kliknij Login
  await signupPage.login(user.email, user.password);

  // 8. Sprawdź, czy użytkownik jest zalogowany
  await signupPage.expectLoggedInAsVisible(user.name);

  // 9. Usuń konto
  await signupPage.deleteAccount();

  // 10. Sprawdź, czy pojawił się napis 'ACCOUNT DELETED!'
  await signupPage.expectAccountDeletedVisible();
});
