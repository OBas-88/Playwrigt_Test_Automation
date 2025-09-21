# Playwright Test Automation Framework

This project is a scalable, data-driven Playwright test automation framework designed for modern web applications. It demonstrates best practices in test structure, maintainability, and reporting, suitable for technical evaluations and real-world projects.

## Features
- **Data-driven testing:** Test scenarios are driven from a JSON file for easy scalability and minimal code duplication.
- **Page Object Model:** Centralized locators and actions for maintainable, reusable code.
- **Cross-browser support:** Runs tests on Chromium (Chrome), Firefox, and WebKit (Safari).
- **Allure reporting:** Generates rich, interactive test reports.
- **Automatic video and screenshot capture:** Debug failed tests with video and screenshot evidence.

## Project Structure
```
Playwrigt_Test_Automation/
├── pageObjects/          # Page Object classes
├── tests/                # Test suites
├── utils/                # Test data (JSON)
├── allure-results/       # Allure raw results
├── allure-report/        # Generated Allure report
├── playwright.config.js  # Playwright configuration
├── package.json          # Project dependencies
```

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run tests:**
   ```bash
   npx playwright test
   ```
3. **Generate Allure report:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

## How It Works
- Test scenarios are defined in `utils/testData.json`.
- The test suite in `tests/demo2.spec.js` reads scenarios and runs them dynamically.
- The `ProjectBoardPage` class in `pageObjects/` centralizes all locators and actions.
- Playwright config (`playwright.config.js`) enables cross-browser testing, video/screenshot capture, and Allure reporting.

## Customization
- Add new test scenarios by editing `utils/testData.json`.
- Update locators or actions in `pageObjects/projectBoardPage.js`.
- Change browser/device settings in `playwright.config.js`.

## Requirements
- Node.js >= 16
- Playwright
- Allure CLI (for report viewing)