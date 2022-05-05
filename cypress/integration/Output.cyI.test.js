describe('Output Page', () => {
    beforeEach(() => {
      
    })
  
    it('renders it', () => {
        cy.visit('http://127.0.0.1:3000')

        //check if components exist
        cy.get('[data-testid=inputTodo]').should('exist')
        cy.get('[data-testid=btnShowAll]').should('exist')
        cy.get('[data-testid=btnShowActive]').should('exist')
        cy.get('[data-testid=btnShowCompleted]').should('exist')
        cy.get('[data-testid=btnClearAll]').should('exist')

        //check if todo is inserted
        cy.get('[data-testid=inputTodo]').type('TodoContent1').type('{enter}').should(() => {
            expect(localStorage.getItem('todolist')).not.be.null
        })
        cy.get('[data-testid=todoList]').should('exist')
    
        //check if single todo is deleted
        cy.get('[data-testid=deleteTodo]').click()
        cy.get('[data-testid=todoListCheckbox]').should('not.exist')

        //check if all todos are deleted
        cy.get('[data-testid=inputTodo]').clear().type('TodoContent2').type('{enter}')
        cy.get('[data-testid=btnClearAll]').click()
        cy.get('[data-testid=todoList]').should('not.exist')

        cy.get('[data-testid=inputTodo]').clear().type('TodoContent3').type('{enter}')
        cy.get('[data-testid=checkAll]').click()
        cy.get('[data-testid=btnShowCompleted]').click()
        cy.get('[data-testid=btnShowActive]').click()
        cy.get('[data-testid=todoList]').should('not.exist')

    })
  })
  