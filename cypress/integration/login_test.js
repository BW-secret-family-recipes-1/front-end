context('user can login', () => {
    it('navigates to the page', ()=>{
        cy.visit('localhost:3000/')
    })
    it('types an email', ()=>{
        cy.get('#email')
        .type('testing@email.com')
        .should('have.value', 'testing@email.com')
    })
    it('types a password', ()=>{
        cy.get('#password')
        .type('i<3Lambd4')
        .should('have.value', 'i<3Lambd4')
    })
    it('clicks the submit button', ()=>{
        cy.get('[type=submit]')
        .click()

        cy.url()
        .should('include', 'user')
    })
    
});
context('user can sign up', ()=>{
    it('visits the site', ()=>{
        cy.visit('localhost:3000')
        cy.get('[cy-data=signup]')
        .click()
        cy.url()
        .should('include', 'signup')
    })
    it('enters an email', ()=>{
        cy.get('#email')
        .type('testing@email.com')
    })
    it('enters a password', ()=>{
        cy.get('#password')
        .type('aBc!23456')
    })
    it('enters a name', ()=>{
        cy.get('#first_name')
        .type('Test')
        .should('have.value', 'Test')
        cy.get('#last_name')
        .type('User')
        .should('have.value', 'User')
    })
    it('submits the form and navigates to the user page', ()=>{
        cy.get('[type=submit]')
        .click()

        cy.url()
        .should('include', '/user')
    })
})