class TransferPage {
      
    fillTransferDetails(accountNumber, digit, transferValue, description) { // Fill Transfer Form
      cy.get('input[name="accountNumber"]').type(accountNumber);
      cy.get('input[name="digit"]').type(digit);
      cy.get('input[name="transferValue"]').type(transferValue);
      cy.get('input[name="description"]').type(description);
    }
    
    submitTransfer(originAccount, ammount) {    // Update balance moving the value from the origin account to the destination account
      cy.get('button[type="submit"]').click();
      cy.readFile("cypress/fixtures/createdAccounts.json", (err, createdAccounts) => {
        if (err) {
            return console.error(err);
        };
      }).then((createdAccounts) => {
        if(originAccount==0){
            createdAccounts[0].balance = balance - ammount;
            createdAccounts[1].balance = balance + ammount;    
        }else if(originAccount==1){
            createdAccounts[1].balance = balance - ammount;
            createdAccounts[0].balance = balance + ammount;
        }
        else{
            cy.log("Invalid account!");
        }
        cy.writeFile("cypress/fixtures/createdAccounts.json", JSON.stringify(createdAccounts));  // Writing the new account data for the tests
      })
    }
  
    assertSuccessfulTransfer() {
      cy.get('#modalText').should('contain.text', 'Transferencia realizada com sucesso');
    }

    closeMessage(){
        cy.get("#btnCloseModal").click();
    }

    returnToBalance(){
        cy.get("#btnBack").click();
    }

  }
  
  export default TransferPage;