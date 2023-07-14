describe('ServeRest API Tests', () => {
      
    it('GET Test', () => {
      cy.request({      // GET verb test
        method: 'GET',
        url: '/usuarios'  
      }).then((response) => {
        expect(response.status).to.eq(200);  // It should return the code 200 and the list of users already registered
        expect(response.body).has.property('usuarios');
      })
    });
  
    it('POST Test', () => {
        cy.fixture('testData').then((testDataJSON) => {
          const requestBody = testDataJSON[0];    // Using data from the first element of testData JSON to create a new user
          cy.request({      // POST verb test

            method: 'POST',
            url: '/usuarios',  
            body: 
              requestBody
            
          
          }).then((response) => {
            expect(response.status).to.eq(201);   // It should return the code 201 and the id of the new user created
            expect(response.body).has.property('_id');
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            const id = response.body._id;
            cy.readFile("cypress/fixtures/createdTestData.json", (err, createdId) => {
              if (err) {
                  return console.error(err);
              };
            }).then((createdId) => {
              createdId._id = id;
              cy.writeFile("cypress/fixtures/createdTestData.json", JSON.stringify(createdId))  // Writing the id of the new user created for future tests
            })


          })
        })

      });
    
     it('PUT Test', () => {
        cy.fixture('testData').then((testDataJSON) => {
          const requestBody = testDataJSON[1];    // Using data from the second element of testData JSON to update the newly created user 
          cy.readFile("cypress/fixtures/createdTestData.json", (err, createdId) => {  // Reading the id of the user created from the previous test
            if (err) {
                return console.error(err);
            };
          }).then((createdId) => {
            const id = createdId._id;
            if (id) {
              cy.request({      // PUT verb test
                method: 'PUT',
                url: '/usuarios/'+id,  // Using the ID of the newly created user
                body: requestBody
              }).then((response) => {
                expect(response.status).to.eq(200);  // It should return the code 200 and a message
                expect(response.body.message).to.eq('Registro alterado com sucesso');
              })
            } else {
              cy.log('ID not avaiable!');
            }
          })
        })
      }); 
  
    it('DELETE Test', () => {
      
      cy.readFile("cypress/fixtures/createdTestData.json", (err, createdId) => {  // Reading the id of the user created from the POST test
        if (err) {
            return console.error(err);
        };
      }).then((createdId) => {
        const id = createdId._id;
        if (id) {
          cy.request({    // DELETE verb test
            method: 'DELETE',
            url: (`/usuarios/`+id)    // Using the ID of the newly created user
          }).then((response) => {
            expect(response.status).to.eq(200);  // It should return the code 200 and a message
            expect(response.body.message).to.eq('Registro excluído com sucesso');
          })
          createdId._id = id;
        } else {
          cy.log('ID not avaiable!');
        }
      })
    });

    after(() => {
      // Erases all test-generated data
      cy.readFile("cypress/fixtures/createdTestData.json", (err, createdId) => {    // Reading the id of the user created from the POST test
        if (err) {
            return console.error(err);
        };
      }).then((createdId) => {
        const id = createdId._id;
        if (id) {
          cy.request({  // Reusing the DELETE verb test
            method: 'DELETE',
            url: (`/usuarios/`+id)  // Using the ID of the newly created user
          }).its('status').should('equal', 200);  // It should return the code 200
          createdId._id = null;   // Erasing the id from the fixture file if necessary
        } else {
          cy.log('ID not avaiable!');
        }
        createdId._id = id;
        cy.writeFile("cypress/fixtures/createdTestData.json", JSON.stringify(createdId))  // Writing the null id to fixture file
      })
    });

  });
  