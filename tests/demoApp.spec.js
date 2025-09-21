// Data-driven Playwright test suite for the Project Board Demo App
// This test file reads test scenarios from a JSON file and runs each scenario dynamically.
// Benefits:
// - Easily add or update test cases by editing the JSON file (no code changes needed)
// - Maximizes code reusability and scalability
// - Uses a Page Object for maintainable locators and actions
//
// How it works:
// 1. The testData.json file contains an array of test scenarios (app, column, card, tags)
// 2. The test suite logs in before each test
// 3. For each scenario, it navigates to the correct app, finds the card in the specified column, and checks all required tags
// 4. All locators and actions are handled by the ProjectBoardPage class

const { test } = require('@playwright/test');
const { ProjectBoardPage } = require('../pageObjects/projectBoardPage');
const dataset = require('../utils/testData.json');

// Login before each test using the Page Object
// This ensures every test starts from a logged-in state
// Credentials are now read from each scenario in the JSON file

dataset.forEach(data => {
    test(`Verify "${data.card}" in "${data.app}" (${data.column})`, async ({ page }) => {
        const board = new ProjectBoardPage(page);
        await board.goto();
        await board.login(data.login.username, data.login.password);
        await board.selectApp(data.app);
        const card = await board.expectCardVisible(data.column, data.card);
        for (const tag of data.tags) {
            await board.expectTagVisible(card, tag);
        }
    });
});
