import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

test("Register User", async ({ page }) => {
  const signupPage = new SignupPage(page);

  // 1–3. Otwórz stronę i sprawdź stronę główną
  await signupPage.open();
  await signupPage.handleConsentIfVisible();
  await signupPage.expectSignupLoginVisible();

  // 4–5. Przejdź do rejestracji
  await signupPage.clickSignupLogin();
  await signupPage.expectNewUserSignupVisible();

  // 6–7. Wpisz nazwę i mail
  const name: string = "Sabina";
  const email: string = `sabina${Date.now()}@example.com`;

  await signupPage.registerInitialDetails(name, email);

  // 8. Sprawdź sekcję informacji o koncie
  await signupPage.expectAccountInformationVisible();

  // 9–12. Uzupełnij formularz
  await signupPage.fillAccountInformation({
    title: "Mrs",
    password: "Test123!",
    day: "28",
    month: "2",
    year: "2002",
    newsletter: true,
    specialOffers: true,
    firstName: "Sabina",
    lastName: "Plak",
    company: "Craftware",
    address: "Marca polo 21",
    address2: "Marca polo 33",
    country: "United States",
    state: "Poland",
    city: "Wrocław",
    zipcode: "51-505",
    mobileNumber: "691777892",
  });

  await signupPage.handleConsentIfVisible();

  // 13. Utwórz konto
  await signupPage.createAccount();

  // 14. Sprawdź komunikat o utworzeniu konta
  await signupPage.expectAccountCreatedVisible();

  // 15. Kontynuuj
  await signupPage.continue();

  // 16. Sprawdź, czy użytkownik jest zalogowany
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

  // 17. Usuń konto
  await signupPage.deleteAccount();

  // 18. Sprawdź komunikat o usunięciu konta
  await signupPage.expectAccountDeletedVisible();
  await signupPage.continue();
});