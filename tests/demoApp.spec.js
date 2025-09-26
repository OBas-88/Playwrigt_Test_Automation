// Playwright test suite for the Project Board Demo App
//
// Features:
// - Data-driven: Reads test scenarios from testData.json and runs each scenario dynamically
// - Page Object Model: Uses ProjectBoardPage for maintainable locators and actions
// - beforeEach hook: Initializes a new ProjectBoardPage and logs in before every test using credentials from the test data
// - Each test: Selects the app, finds the card in the specified column, and checks all required tags
//
// How it works:
// 1. The testData.json file contains an array of test scenarios (app, column, card, tags, login credentials)
// 2. The beforeEach hook creates a fresh page object and logs in with scenario-specific credentials
// 3. Each test navigates to the correct app, finds the card, and verifies all required tags
// 4. All locators and actions are handled by the ProjectBoardPage class

const { test } = require('@playwright/test');
const { ProjectBoardPage } = require('../pageObjects/projectBoardPage');
const dataset = require('../utils/testData.json');

let board;

test.beforeEach(async ({ page }, testInfo) => {
    // Setup: create page object and login before each test
    board = new ProjectBoardPage(page);
    await board.goto();
    //credentials from the current test data
    const data = dataset[testInfo.repeatEachIndex || testInfo.workerIndex || 0];
    await board.login(data.login.username, data.login.password);
});

dataset.forEach((data) => {
    test(data.scenario, async ({ page }) => {
        await board.selectApp(data.app);
        const card = await board.expectCardVisible(data.column, data.card);
        for (const tag of data.tags) {
            await board.expectTagVisible(card, tag);
        }
        // Check expected status if available in card object
        if (data.expected && data.expected.status && card.status) {
            await test.expect(card.status).toBe(data.expected.status);
        }
    });
});
