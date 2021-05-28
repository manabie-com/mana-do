describe('login', function () {
    it('login successfully', function () {
        cy.visit('/')

        cy.get('input[name="userId"]').type('firstUser')
        cy.get('input[name="password"]').type('example')
        cy.get('button').click()

        cy.url().should('include', '/todo')
    })
})
