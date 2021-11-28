describe('Check Flow Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('default access site', () => {
        cy.get('.sign-in-btn').should('have.text', 'Sign in')
    })

    it('check success authentication', () => {
        cy.get('#user_id')
            .type('firstUser').should('have.value', 'firstUser')

        cy.get('#password')
            .type('example').should('have.value', 'example')

        cy.get('.sign-in-btn').click().then(() => {
            expect(localStorage.getItem('token')).to.eq('testabc.xyz.ahk')
            cy.get('.login-title').should('have.text', 'Task management')
        })
    })
})
describe('Check Flow Login Should redirect from login todo', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'testabc.xyz.ahk')
        cy.visit('http://localhost:3000')
    })

    it('should redirect to todo page', () => {
        cy.get('.login-title').should('have.text', 'Task management')
    })
})
describe('Check Flow Login 2 redirect from todo to login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/todo')
    })

    it('default access site', () => {
        cy.get('.sign-in-btn').should('have.text', 'Sign in')
    })
})