class BalancePage {
      
    assertAccountBalance(expectedBalance) {    // Account Balance Validation
      if(expectedBalance >= 1000){
        expectedBalance = expectedBalance.toLocaleString('en-US', { useGrouping: true });
        expectedBalance = expectedBalance.replace(',','.');
      }

      cy.get(`#textBalance`).should('contain.text', 'Saldo em conta R$ '+expectedBalance+',00');
    }

    assertAccountName(accountName) {    // Account Name Validation
        cy.get(`#textName`).should('contain.text', accountName);
      }

    accessTransferPage() {  // Access Transfer Page
        cy.get('#btn-TRANSFERÊNCIA').click();
    }

    logout(){ // Logout
        cy.get('#btnExit').click();
    }

    assertSuccessfulLogout() { // Validate Logout
        cy.contains('button', 'Acessar').should('be.visible');
    }

  }
  
  export default BalancePage;