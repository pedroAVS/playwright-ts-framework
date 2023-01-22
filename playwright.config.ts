import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 0,
  //globalTimeout: 60 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['html', { open: 'never' }] ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://api.a.qa.bk-nz.tillster.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    hasTouch: true,
    headless: false,
    permissions: [
      'geolocation', 
      'notifications',
    ],
    locale: 'en-NZ',
    geolocation: { longitude: 174.7653616, latitude: -36.8494698 },
  },

  /* Configure projects for major browsers */
  projects: [

    /* Test against mobile viewports. */
    {
        name: 'Mobile Chrome',
        use: {
          browserName: 'chromium',
          ...devices['Pixel 5'],
          bypassCSP: true,
          ignoreHTTPSErrors: true,
          launchOptions: { args: [
            "--dev-tools",
            "--disable-web-security",
            "--allow-insecure-localhost",
            "--ignore-certificate-errors",
          ]},
        }
    },
    // {
    //   name: 'iPhone 12',
    //   use: {
    //     browserName: 'webkit',
    //     ...devices['iPhone 12'],
    //     bypassCSP: true,
    //     launchOptions: { args: [
    //       "--disable-web-security",
    //       "--no-sandbox",
    //       "--allow-file-access-from-files",
    //       "--allow-insecure-localhost",
    //       "--ignore-certificate-errors",
    //     ]},
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
