# cypress-automation-test
This repository contains a set of automated tests written using Cypress for testing some API verbs and the UI of the BugBank application.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run the tests locally, you need to have the following software installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Cypress](https://www.cypress.io/) - JavaScript-based end-to-end testing framework

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/cypress-automation-test.git
   ```

2. Change into the project directory:

   ```bash
   cd cypress-automation-test
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```

This command will execute the Cypress test runner, which will launch a browser and run the automated tests against the Money Transfer application.

## Folder Structure

The folder structure of this project is as follows:

```
├── cypress
│   ├── fixtures
│   │   ├── dataTest.json
│   │   ├── createdDataTest.json
│   │   └── createdAccounts.json
│   ├── e2e
│   │   └── API
│   │   │   └── api.spec.cy.js
│   │   └── UI
│   │   │   └── ui.spec.cy.js
│   ├── pageObjects
│   │   ├── BalancePage.js
│   │   ├── LoginPage.js
│   │   └── TransferPage.js
│   └── support
├── README.md
├── cypress.json
└── package.json
```

- `cypress/fixtures`: Contains test data fixtures used by the tests.
- `cypress/e2e`: Contains the test file(s) written in Cypress's test script format.
- `cypress/pageObjects`: Contains the page object files that encapsulate the interactions with different pages of the application.
- `cypress/support`: Contains supporting files for the tests (e.g., custom commands, utilities).
- `cypress.json`: Cypress configuration file.
- `package.json`: NPM package configuration file.

## Contributing

Contributions are welcome! If you find any issues or want to add new features or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

This README file provides an overview of the project, including instructions for getting started, running tests, and the project's folder structure. It also includes sections for contributing and the project's license.

Feel free to modify the README file based on your specific project requirements and guidelines.
