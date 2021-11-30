/* eslint-disable no-undef */
describe('Login feature', () => {
    it('User login success', () => {
        const [user, pass] = ['firstUser', 'example'];
        cy.visit('localhost:3000/');
        cy.findByRole('textbox', { name: /user id/i }).type(user);
        cy.findByLabelText(/password/i).type(pass);
        cy.findByRole('button', { name: /sign in/i }).click();
        cy.findByRole('button', { name: /sign in/i }).should('not.exist');
    });

    it('User login fail', () => {
        const [user, pass] = ['abc', '123'];
        cy.visit('localhost:3000/');
        cy.findByRole('textbox', { name: /user id/i }).type(user);
        cy.findByLabelText(/password/i).type(pass);
        cy.findByRole('button', { name: /sign in/i }).click();
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false;
        });
        cy.findByRole('button', { name: /sign in/i }).should('exist');
    });
});
