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
    // Visit BugBank HomePage
    loginPage.visit();
  })

  it('Register two new accounts with balance', () => {
    
    cy.fixture('createdAccounts').then((accountData) => {
      loginPage.accessRegister();
      // Enter details for account 1
      loginPage.fillRegisterForm(accountData[0].email,accountData[0].nome,accountData[0].password);
      // Submit registration form for account 1
      loginPage.register();
      loginPage.updateAccount(0);
      loginPage.assertSuccessfulRegister();
      loginPage.closeModal();
      // Access the homepage again to create another account with empty registration form
      loginPage.visit();
      loginPage.accessRegister();
      // Enter details for account 2
      loginPage.fillRegisterForm(accountData[1].email,accountData[1].nome,accountData[1].password);
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
    const ammount = 100;
    const description = "Test";
    cy.fixture('createdAccounts').then((accountData) => {
      // Enter login credentials for account 1
      loginPage.fillLoginForm(accountData[0].email,accountData[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(accountData[0].nome);
      balancePage.accessTransferPage();
      // Fill transfer form
      transferPage.fillTransferDetails(accountData[1].accountNumber,accountData[1].digit, ammount, description);
      // Submit transfer and update account balance
      transferPage.submitTransfer(0, ammount);
      transferPage.assertSuccessfulTransfer();
      
     });
  });

  
  it('Check the balance in all accounts', () => {
    
    cy.fixture('createdAccounts').then((accountData) => {
      // Enter login credentials for account 1
      loginPage.fillLoginForm(accountData[0].email,accountData[0].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(accountData[0].nome);
      // Checks balance from account 1
      balancePage.assertAccountBalance(accountData[0].balance)
      balancePage.logout();

      // Enter login credentials for account 2
      loginPage.fillLoginForm(accountData[1].email,accountData[1].password);
      loginPage.login();
      loginPage.assertSuccessfulLogin();
      balancePage.assertAccountName(accountData[1].nome);
      // Checks balance from account 2
      balancePage.assertAccountBalance(accountData[1].balance);
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
