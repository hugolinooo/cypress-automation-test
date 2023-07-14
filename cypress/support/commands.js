// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- Save localStorage between tests
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('generateNewData', () => {
    const random1 = Math.floor(Math.random() * 999999); 
    const random2 = Math.floor(Math.random() * 999999); 
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
        if (err) {
            return console.error(err);
        };
    }).then((createdAccounts) => {
        createdAccounts[0].email = random1+"@qa.com" ;
        createdAccounts[0].password = random1;
        createdAccounts[1].email = random2+"@qa.com" ;
        createdAccounts[1].password = random2;
        cy.writeFile("cypress/fixtures/createdAccounts.json", JSON.stringify(createdAccounts));  // Writing the new data for the tests
    })
});

Cypress.Commands.add('updateJsonAccount', (account) => {
    
    cy.get('#modalText').invoke('text').then((text) => {
        
        cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
            if (err) {
                return console.error(err);
            };
        }).then((createdAccounts) => {
            const regex = /(\d+)-(\d+)/;
            const match = text.match(regex);
            createdAccounts[account].accountNumber = match[1];
            createdAccounts[account].digit = match[2];
            cy.writeFile("cypress/fixtures/createdAccounts.json", JSON.stringify(createdAccounts));  // Writing the new account data for the tests
        })
    })
});
    
Cypress.Commands.add('updateBalance', (account, newValue) => {
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
        if (err) {
            return console.error(err);
        };
    }).then((createdAccounts) => {
        createdAccounts[account].balance = newValue;
        cy.writeFile("cypress/fixtures/createdAccounts.json", JSON.stringify(createdAccounts));  // Writing the new data for the tests
    })
});

Cypress.Commands.add('getBalance', (account) => {
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => { //Get the balance for one account (inform 0 or 1)
        if (err) {
            return console.error(err);
        };
    }).then((createdAccounts) => {
        return createdAccounts[account].balance;
    })
});

Cypress.Commands.add('eraseData', () => {
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
        if (err) {
            return console.error(err);
        };
    }).then((createdAccounts) => {
        createdAccounts[0].email = null;
        createdAccounts[0].password = null;
        createdAccounts[0].accountNumber = null;
        createdAccounts[0].digit = null;
        createdAccounts[0].balance = 1000;
        createdAccounts[1].email = null ;
        createdAccounts[1].password = null;
        createdAccounts[1].accountNumber = null;
        createdAccounts[1].digit = null;
        createdAccounts[1].balance = 1000;
        cy.writeFile("cypress/fixtures/createdAccounts.json", JSON.stringify(createdAccounts));  // Writing the new data for the tests
    })
});
    
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })