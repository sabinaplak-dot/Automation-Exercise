import { Page } from "@playwright/test";

export class SignupPage {
  private page: Page;

  // Strona główna
  private signupLoginLink;

  // Formularz rejestracji
  private newUserSignupHeading;
  private signupNameInput;
  private signupEmailInput;
  private signupButton;

  // Informacje o koncie
  private accountInformationHeading;
  private mrsRadio;
  private passwordInput;
  private daySelect;
  private monthSelect;
  private yearSelect;
  private newsletterCheckbox;
  private specialOffersCheckbox;

  // Dane adresowe
  private firstNameInput;
  private lastNameInput;
  private companyInput;
  private addressInput;
  private address2Input;
  private countrySelect;
  private stateInput;
  private cityInput;
  private zipcodeInput;
  private mobileNumberInput;

  // Przyciski i komunikaty końcowe
  private createAccountButton;
  private accountCreatedHeading;
  private continueLink;
  private deleteAccountLink;
  private accountDeletedHeading;
  private consentButton;

  constructor(page: Page) {
    this.page = page;

    // Strona główna
    this.signupLoginLink = page.locator('a[href="/login"]');

    // Formularz rejestracji
    this.newUserSignupHeading = page.getByText("New User Signup!", {
      exact: true,
    });

    this.signupNameInput = page.locator(
      'form[action="/signup"] input[name="name"]',
    );

    this.signupEmailInput = page.locator(
      'form[action="/signup"] input[name="email"]',
    );

    this.signupButton = page.locator(
      'form[action="/signup"] button[type="submit"]',
    );

    // Informacje o koncie
    this.accountInformationHeading = page.getByText(
      /Enter Account Information/i,
    );

    this.mrsRadio = page.locator("#id_gender2");
    this.passwordInput = page.locator("#password");
    this.daySelect = page.locator("#days");
    this.monthSelect = page.locator("#months");
    this.yearSelect = page.locator("#years");

    this.newsletterCheckbox = page.locator("#newsletter");
    this.specialOffersCheckbox = page.locator("#optin");

    // Dane adresowe
    this.firstNameInput = page.locator("#first_name");
    this.lastNameInput = page.locator("#last_name");
    this.companyInput = page.locator("#company");
    this.addressInput = page.locator("#address1");
    this.address2Input = page.locator("#address2");
    this.countrySelect = page.locator("#country");
    this.stateInput = page.locator("#state");
    this.cityInput = page.locator("#city");
    this.zipcodeInput = page.locator("#zipcode");
    this.mobileNumberInput = page.locator("#mobile_number");

    // Przycisk i komunikat końcowy
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });

    this.accountCreatedHeading = page.getByText("Account Created!", {
      exact: true,
    });

    this.continueLink = page.getByRole("link", {
      name: "Continue",
    });

    this.deleteAccountLink = page.locator('a[href="/delete_account"]');

    this.accountDeletedHeading = page.getByText("Account Deleted!", {
      exact: true,
    });

    // Przycisk zgody na stronie
    this.consentButton = page.getByRole("button", {
      name: "Consent",
      exact: true,
    });
  }

  // Otwarcie strony
  async open(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
  }

  // Obsługa okna zgody (jeśli się pojawi)
  async handleConsentIfVisible(): Promise<void> {
    if (await this.consentButton.isVisible().catch(() => false)) {
      await this.consentButton.click();
    }
  }

  // Przejście do rejestracji
  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  // Wpisanie imienia i e-maila
  async registerInitialDetails(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  // Wypełnienie informacji o koncie i adresie
  async fillAccountInformation(): Promise<void> {
    await this.mrsRadio.check();
    await this.passwordInput.fill("Test123!");

    await this.daySelect.selectOption("28");
    await this.monthSelect.selectOption("2");
    await this.yearSelect.selectOption("2002");

    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    await this.firstNameInput.fill("Sabina");
    await this.lastNameInput.fill("Plak");
    await this.companyInput.fill("Craftware");
    await this.addressInput.fill("Marca polo 21");
    await this.address2Input.fill("Marca polo 33");
    await this.countrySelect.selectOption("United States");
    await this.stateInput.fill("Poland");
    await this.cityInput.fill("Wrocław");
    await this.zipcodeInput.fill("51-505");
    await this.mobileNumberInput.fill("691777892");
  }

  // Utworzenie konta
  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  // Kliknięcie Continue
  async continue(): Promise<void> {
    await this.continueLink.click();
  }

  // Usunięcie konta
  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }
}
