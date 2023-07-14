import LoginPage from '../../pageObjects/LoginPage';
import TransferPage from '../../pageObjects/TransferPage';
import BalancePage from '../../pageObjects/BalancePage';

describe('BugBank Tests', () => {
  const loginPage = new LoginPage();
  const transferPage = new TransferPage();
  const balancePage = new BalancePage();

  before(() => {
    cy.generateNewData();
  })

  beforeEach(() => {

    cy.restoreLocalStorage();
    // Visit BugBank HomePage
    loginPage.visit();
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });

  after(() => {
    cy.eraseData();
  })

  it('Register two new accounts with balance', () => {
    cy.fixture('createdAccounts').then((createdAccounts) => {
      loginPage.accessRegister();
      // Enter details for account 1
      loginPage.fillRegisterForm(createdAccounts[0].email,createdAccounts[0].nome,createdAccounts[0].password);
      // Submit registration form for account 1
      loginPage.register();
      loginPage.updateAccount(0);
      loginPage.assertSuccessfulRegister();
      loginPage.closeModal();
      
      loginPage.accessRegister();
      // Erase the registration form
      loginPage.eraseRegisterForm();
      // Enter details for account 2
      loginPage.fillRegisterForm(createdAccounts[1].email,createdAccounts[1].nome,createdAccounts[1].password);
      // Submit registration form for account 1
      loginPage.register();
      loginPage.updateAccount(1);
      loginPage.assertSuccessfulRegister();
      loginPage.closeModal();
    })
  });


  it('Should login to an account', () => {
    cy.fixture('createdAccounts').then((accountData) => {
      // Enter login credentials for account 1
      loginPage.fillLoginForm(accountData[0].email,accountData[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(accountData[0].nome);
    })
  });



  it('Transfer money from account 1 to account 2', () => {
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
      if (err) {
          return console.error(err);
      };
    }).then((createdAccounts) => {

      cy.log(createdAccounts);

      const transferValue = Math.floor(Math.random() * 999);
      const description = "Test";
      const account = createdAccounts[1].accountNumber;
      const dig = createdAccounts[1].digit;

      // Enter login credentials for account 1
      loginPage.fillLoginForm(createdAccounts[0].email,createdAccounts[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(createdAccounts[0].nome);
      balancePage.accessTransferPage();
      // Fill transfer form
      transferPage.fillTransferDetails(account, dig, transferValue, description);
      // Submit transfer and update account balance
      transferPage.submitTransfer(0, transferValue);
      transferPage.assertSuccessfulTransfer();
      
     });
  });

  
  it('Check the balance in all accounts', () => {
    
    cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
      if (err) {
          return console.error(err);
      };
    }).then((createdAccounts) => {
      // Enter login credentials for account 1
      loginPage.fillLoginForm(createdAccounts[0].email,createdAccounts[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(createdAccounts[0].nome);
      // Checks balance from account 1
      balancePage.assertAccountBalance(createdAccounts[0].balance)
      balancePage.logout();

      // Enter login credentials for account 2
      loginPage.fillLoginForm(createdAccounts[1].email,createdAccounts[1].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(createdAccounts[1].nome);
      // Checks balance from account 2
      balancePage.assertAccountBalance(createdAccounts[1].balance);
    })
  });

  
  it('Logout', () => {
    cy.fixture('createdAccounts').then((accountData) => {
      // Enter login credentials for account 1
      loginPage.fillLoginForm(accountData[0].email,accountData[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      // Logout from account 1
      balancePage.logout();
      balancePage.assertSuccessfulLogout();
    })
  });
});
