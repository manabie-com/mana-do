describe("Todo list", function () {
    const todoContent = 'test creating new todo'

    it('Create todo list', function () {
        cy
            .visit('/todo')
            .get('.Todo__input')
            .type(todoContent)
            .type('{enter}')

        cy.get('.ToDo__item')
            .find(`input[value="${todoContent}"]`)
            .should('be.visible')
    })

    it ('Delete a todo list', function () {
        cy
            .get(`input[value="${todoContent}"]`)
            .closest('.ToDo__item')
            .find('.Todo__delete')
            .click()

        cy
            .get(`input[value="${todoContent}"]`)
            .should('not.exist')
    })
})
