// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,


  timeout: 30 * 1000,
  expect: {

    timeout: 5000
  },

  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        launchOptions: {}
      }
    }
  ],
  use: {
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
};

module.exports = config;
