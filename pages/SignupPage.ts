import { expect, type Locator, type Page } from "@playwright/test";

type AccountDetails = {
  title: "Mr" | "Mrs";
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter: boolean;
  specialOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class SignupPage {
  private readonly page: Page;

  // Strona główna
  private readonly signupLoginLink: Locator;

  // Formularz rejestracji
  private readonly newUserSignupHeading: Locator;
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;

  // Informacje o koncie
  private readonly accountInformationHeading: Locator;
  private readonly mrRadio: Locator;
  private readonly mrsRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly daySelect: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly specialOffersCheckbox: Locator;

  // Dane adresowe
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly addressInput: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;

  // Przyciski i komunikaty końcowe
  private readonly createAccountButton: Locator;
  private readonly accountCreatedHeading: Locator;
  private readonly continueLink: Locator;
  private readonly deleteAccountLink: Locator;
  private readonly accountDeletedHeading: Locator;
  private readonly consentButton: Locator;

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

    this.mrRadio = page.locator("#id_gender1");
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

    // Przyciski i komunikaty końcowe
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
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  // Obsługa okna zgody
  async handleConsentIfVisible(): Promise<void> {
    if (await this.consentButton.isVisible().catch(() => false)) {
      await this.consentButton.click();
    }
  }

  // Asercje widoczności elementów
  async expectSignupLoginVisible(): Promise<void> {
    await expect(this.signupLoginLink).toBeVisible();
  }

  async expectNewUserSignupVisible(): Promise<void> {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async expectAccountInformationVisible(): Promise<void> {
    await expect(this.accountInformationHeading).toBeVisible();
  }

  async expectAccountCreatedVisible(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async expectAccountDeletedVisible(): Promise<void> {
    await expect(this.accountDeletedHeading).toBeVisible();
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
  async fillAccountInformation(details: AccountDetails): Promise<void> {
    // Wybór tytułu
    if (details.title === "Mrs") {
      await this.mrsRadio.check();
    } else {
      await this.mrRadio.check();
    }

    // Dane konta
    await this.passwordInput.fill(details.password);
    await this.daySelect.selectOption(details.day);
    await this.monthSelect.selectOption(details.month);
    await this.yearSelect.selectOption(details.year);

    // Zgody
    await this.newsletterCheckbox.setChecked(details.newsletter);
    await this.specialOffersCheckbox.setChecked(details.specialOffers);

    // Dane adresowe
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
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