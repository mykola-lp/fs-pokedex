const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',

  webServer: {
    command: 'npm start',
    url: 'http://localhost:8080',
    timeout: 120000,
    reuseExistingServer: true
  },

  use: {
    baseURL: 'http://localhost:8080'
  }
})