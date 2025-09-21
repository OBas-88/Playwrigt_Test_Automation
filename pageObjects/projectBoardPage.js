const { expect } = require('@playwright/test');

class ProjectBoardPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object for browser interaction
   */
  constructor(page) {
    this.page = page; // Playwright page instance
    // Selectors and config
    this.url = 'https://animated-gingersnap-8cf7f2.netlify.app/'; // App URL
    this.usernameLabel = 'Username'; // Login username field label
    this.passwordLabel = 'Password'; // Login password field label
    this.signInButton = 'Sign in'; // Login button text
  }

  /**
   * Navigates to the demo app URL
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Logs in using provided credentials
   * @param {string} username - Username to enter
   * @param {string} password - Password to enter
   */
  async login(username, password) {
    await this.page.getByLabel(this.usernameLabel).fill(username);
    await this.page.getByLabel(this.passwordLabel).fill(password);
    await this.page.getByRole('button', { name: this.signInButton }).click();
  }

  /**
   * Selects the application tab by name
   * @param {string} appName - Name of the application tab to select
   */
  async selectApp(appName) {
    await this.page.getByRole('button', { name: appName }).click();
  }

  /**
   * Gets the column container by name
   * @param {string} columnName - Name of the column (e.g., 'To Do', 'In Progress')
   * @returns {Locator} - Playwright locator for the column container
   */
  getColumn(columnName) {
    return this.page.getByRole('heading', { name: columnName }).locator('..');
  }

  /**
   * Gets the card element by title within a column
   * @param {Locator} column - Locator for the column container
   * @param {string} cardTitle - Title of the card to find
   * @returns {Locator} - Playwright locator for the card element
   */
  getCard(column, cardTitle) {
    return column.getByText(cardTitle).locator('..').locator('..');
  }

  /**
   * Asserts that a card is visible in a column
   * @param {string} columnName - Name of the column
   * @param {string} cardTitle - Title of the card
   * @returns {Locator} - Playwright locator for the card
   */
  async expectCardVisible(columnName, cardTitle) {
    const column = this.getColumn(columnName);
    const card = this.getCard(column, cardTitle);
    await expect(card).toBeVisible();
    return card;
  }

  /**
   * Asserts that a tag is visible on a card
   * @param {Locator} card - Locator for the card element
   * @param {string} tagName - Name of the tag to check
   */
  async expectTagVisible(card, tagName) {
    const tag = card.getByText(tagName, { exact: true });
    await expect(tag).toBeVisible();
  }
};

module.exports = { ProjectBoardPage };