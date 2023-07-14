Feature: User Registration

Scenario: User Registration with valid credentials

Given the user is on the BugBank login page
When the user clicks on the Register button
And fills in the registration form with valid credentials
And clicks on the Register button
Then the user should see a success message
And be redirected to the login page.

Scenario: User Registration with existing Name

Given the user is on the BugBank homepage
When the user clicks on the Register button
And the user is in the registration form with an existing username
And clicks on the Register button
Then the user should see an error message stating that the username is already taken.

Scenario: User Registration with empty credentials

Given the user is on the BugBank homepage
When the user clicks on the Register button
And leaves all form empty
And clicks on the Register button
Then the user should see error messages indicating that all fields are mandatory.

Scenario: User Registration with wrong password confirmation

Given the user is on the BugBank homepage
When the user clicks on the Register button
And leaves all form empty
And clicks on the Register button
Then the user should see error messages indicating that all fields are mandatory.

Feature: User Login

Scenario: User Login with valid credentials

Given the user is on the BugBank login page
When the user fills in the login form with valid credentials
And clicks on the Access button
Then the user should be redirected to the dashboard page
And sees their username displayed.

Scenario: User Login with empty credentials

Given the user is on the BugBank login page
When the user leaves the credentials empty
And clicks on the Access button
Then the user should see an error message indicating that the fields email and password are mandatory
And remain on the login page.

Scenario: User Login with invalid email

Given the user is on the BugBank login page
When the user enters an invalid email
And clicks on the Access button
Then the user should see an error message indicating an invalid username or password
And remain on the login page.

Scenario: User Login with invalid format email

Given the user is on the BugBank login page
When the user enters an invalid fomat email
And clicks on the Access button
Then the user should see an error message indicating an invalid username or password
And remain on the login page.

Feature: Transfer Between Accounts

Scenario: Successful fund transfer

Given the user is logged into BugBank
And has sufficient funds in their source account
And wants to transfer a specific amount to a destination account
When the user navigates to the Transfer page
And enters the destination account, transfer amount and description
And clicks on the Transfer Now button
Then the user should see a confirmation message
And the specified amount should be transferred from the source account to the destination account.

Scenario: Fund transfer with empty fields

Given the user is logged into BugBank
And has sufficient funds in their source account
And wants to transfer a specific amount to a destination account
When the user navigates to the Transfer page
And leaves all form empty
And clicks on the Transfer Now button
Then the user should see an error message indicating that the fields account and transfer ammount are mandatory.

Scenario: Fund transfer with negative ammount

Given the user is logged into BugBank
And has sufficient funds in their source account
And wants to transfer a specific amount to a destination account
When the user navigates to the Transfer page
And enters the destination account and description
And enters a negative transfer amount 
And clicks on the Transfer Now button
Then the user should see an error message indicating that the fields transfer ammount is invalid.