
class SignupPage {
    constructor(page) {
        this.page = page;

        // Strona główna
        this.signupLoginLink = page.locator('a[href="/login"]');

        // Formularz rejestracji
        this.newUserSignupHeading = page.getByText(
            'New User Signup!',
            { exact: true }
        );

        this.signupNameInput = page.locator(
            'form[action="/signup"] input[name="name"]'
        );

        this.signupEmailInput = page.locator(
            'form[action="/signup"] input[name="email"]'
        );

        this.signupButton = page.locator(
            'form[action="/signup"] button[type="submit"]'
        );

        // Informacje o koncie
        this.accountInformationHeading = page.getByText(
            /Enter Account Information/i
        );

        this.mrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.locator('#password');
        this.daySelect = page.locator('#days');
        this.monthSelect = page.locator('#months');
        this.yearSelect = page.locator('#years');

        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');

        // Dane adresowe
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.companyInput = page.locator('#company');
        this.addressInput = page.locator('#address1');
        this.address2Input = page.locator('#address2');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');

        // Przyciski i komunikaty końcowe
        this.createAccountButton = page.getByRole('button', {
            name: 'Create Account'
        });

        this.accountCreatedHeading = page.getByText(
            'Account Created!',
            { exact: true }
        );

        this.continueLink = page.getByRole('link', {
            name: 'Continue'
        });

        this.deleteAccountLink = page.locator(
            'a[href="/delete_account"]'
        );

        this.accountDeletedHeading = page.getByText(
            'Account Deleted!',
            { exact: true }
        );

        // Przycisk zgody na stronie
       this.consentButton = page.getByRole('button', {
    name: 'Consent',
    exact: true
});
        
    }

    // Otwarcie strony
    async open() {
        await this.page.goto('https://automationexercise.com/');
    }

    // Obsługa okna zgody, jeśli się pojawi
    async handleConsentIfVisible() {
        if (await this.consentButton.isVisible().catch(() => false)) {
            await this.consentButton.click();
        }
    }

    // Przejście do rejestracji
    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }

    // Wpisanie imienia i e-maila
    async registerInitialDetails(name, email) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    // Wypełnienie informacji o koncie i adresie
    async fillAccountInformation() {
        await this.mrsRadio.check();
        await this.passwordInput.fill('Test123!');

        await this.daySelect.selectOption('28');
        await this.monthSelect.selectOption('2');
        await this.yearSelect.selectOption('2002');

        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();

        await this.firstNameInput.fill('Sabina');
        await this.lastNameInput.fill('Plak');
        await this.companyInput.fill('Playwright');
        await this.addressInput.fill('Example Street 22');
        await this.address2Input.fill('Apartment 2');
        await this.countrySelect.selectOption('Australia');
        await this.stateInput.fill('Victoria');
        await this.cityInput.fill('Melbourne');
        await this.zipcodeInput.fill('3000');
        await this.mobileNumberInput.fill('681777777');
    }

    // Utworzenie konta
    async createAccount() {
        await this.createAccountButton.click();
    }

    // Kliknięcie Continue
    async continue() {
        await this.continueLink.click();
    }

    // Usunięcie konta
    async deleteAccount() {
        await this.deleteAccountLink.click();
    }
}

module.exports = { SignupPage };
