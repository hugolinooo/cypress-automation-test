class BalancePage {
      
    assertAccountBalance(expectedBalance) {    // Account Balance Validation
      cy.get(`#textBalance`).should('contain.text', expectedBalance);
    }

    assertAccountName(accountName) {    // Account Name Validation
        cy.get(`#textName`).should('contain.text', accountName);
      }

    accessTransferPage() {  // Access Transfer Page
        cy.get('#transferButton').click();
    }

    logout(){ // Logout
        cy.get('#btnExit').click();
    }

    assertSuccessfulLogout() { // Validate Logout
        cy.contains('button', 'Acessar').should('be.visible');
    }

  }
  
  export default BalancePage;