
const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');

test('Register User', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // 1–3. Otwórz stronę i sprawdź stronę główną
    await signupPage.open();
    await signupPage.handleConsentIfVisible();

    await expect(signupPage.signupLoginLink).toBeVisible();

    // 4–5. Przejdź do rejestracji
    await signupPage.clickSignupLogin();

    await expect(
        signupPage.newUserSignupHeading
    ).toBeVisible();

    // 6–7. Wpisz nazwę i mail
    const name = 'Sabina';
    const email = `sabina${Date.now()}@example.com`;

    await signupPage.registerInitialDetails(name, email);

    // 8. Sprawdź sekcję informacji o koncie
    await expect(
        signupPage.accountInformationHeading
    ).toBeVisible();

    // 9–12. Uzupełnij formularz
    await signupPage.fillAccountInformation();

    // 13. Utwórz konto
    await signupPage.createAccount();

    // 14. Sprawdź komunikat o utworzeniu konta
    await expect(
        signupPage.accountCreatedHeading
    ).toBeVisible();

    // 15. Kontynuuj
    await signupPage.continue();

    // 16. Sprawdź czy użytkownik jest zalogowany
    await expect(
        page.getByText(`Logged in as ${name}`)
    ).toBeVisible();

    // 17. Usuń konto
    await signupPage.deleteAccount();

    // 18. Sprawdź komunikat o usunięciu konta
    await expect(
        signupPage.accountDeletedHeading
    ).toBeVisible();

    await signupPage.continue();
});
