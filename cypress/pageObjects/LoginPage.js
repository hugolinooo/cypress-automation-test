class LoginPage {
    visit() {
      cy.visit('https://bugbank.netlify.app/'); // Access the login page URL
    }
  
    fillLoginForm(email, password) { // Fill Login fields
      cy.get('input[name="email"]').eq(0).type(email);
      cy.get('input[name="password"]').eq(0).type(password);
    }
  
    login() { // Click Login button
        cy.contains('button', 'Acessar').click();
    }

    assertSuccessfulLogin() { // Validate Login Message
        cy.url().should('include', '/home');
    }

    accessRegister() { // Access Register Form
        cy.contains('button', 'Registrar').click();
    }

    fillRegisterForm(email, name, password) { // Fill Register Form
        
        cy.get('input[name="email"]').eq(1).type(email,{force: true});
        cy.get('input[name="name"]').type(name,{force: true});
        cy.get('input[name="password"]').eq(1).type(password,{force: true});
        cy.get('input[name="passwordConfirmation"]').type(password,{force: true});
        cy.get('#toggleAddBalance').click({force: true});
    }

    eraseRegisterForm() { // Erase Register Form
        
        cy.get('input[name="email"]').eq(1).clear({force: true});
        cy.get('input[name="name"]').clear({force: true});
        cy.get('input[name="password"]').eq(1).clear({force: true});
        cy.get('input[name="passwordConfirmation"]').clear({force: true});
        cy.get('#toggleAddBalance').click({force: true});
    }

    updateAccount(account){
        cy.updateJsonAccount(account);
    }

    register() { // Click Register Button
        cy.contains('button', 'Cadastrar').click({force: true});
    }


    assertSuccessfulRegister() { // Validate Login Message
        cy.get("#modalText").should('contain.text','foi criada com sucesso')
    }

    closeModal(){
        cy.get("#btnCloseModal").click();
    }

  }
  
  export default LoginPage;