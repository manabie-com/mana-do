describe('Create Flow', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'testabc.xyz.ahk')
        cy.visit('http://localhost:3000')
    })

    it('should redirect to todo page', () => {
        cy.get('.login-title').should('have.text', 'Task management')
    })
    it('should create successfully and no duplicate data', () => {
        cy.get('.Todo__input')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{enter}')

        cy.get('.Todo__input').should('have.value', '')
        cy.get('.ToDo__item span').should('have.text', 'fake@email.com')
            .should('have.length', 1);
    })
})
describe('Read Flow', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'testabc.xyz.ahk')
        localStorage.setItem('my-todo',
            JSON.stringify([
                {
                    "content": "ghfghf12235",
                    "created_date": "2021-11-28T15:35:58.075Z",
                    "status": "ACTIVE",
                    "id": "wLwGB8L1Y",
                    "user_id": "firstUser"
                }, {
                    "content": "111111",
                    "created_date": "2021-11-28T15:35:43.726Z",
                    "status": "ACTIVE",
                    "id": "etCtZUYce",
                    "user_id": "firstUser"
                }, {
                    "content": "asdasd",
                    "created_date": "2021-11-28T15:35:39.655Z",
                    "status": "ACTIVE",
                    "id": "dXRItTIr5",
                    "user_id": "firstUser"
                }]))

        cy.visit('http://localhost:3000')
    })

    it('should redirect to todo page', () => {
        cy.get('.login-title').should('have.text', 'Task management')
    })
    it('should read successfully and have data length', () => {
        cy.get('.ToDo__item span').should('have.length', 3);
    })
})
describe('Edit Flow', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'testabc.xyz.ahk')
        localStorage.setItem('my-todo',
            JSON.stringify([
                {
                    "content": "ghfghf12235",
                    "created_date": "2021-11-28T15:35:58.075Z",
                    "status": "ACTIVE",
                    "id": "wLwGB8L1Y",
                    "user_id": "firstUser"
                }, {
                    "content": "111111",
                    "created_date": "2021-11-28T15:35:43.726Z",
                    "status": "ACTIVE",
                    "id": "etCtZUYce",
                    "user_id": "firstUser"
                }, {
                    "content": "asdasd",
                    "created_date": "2021-11-28T15:35:39.655Z",
                    "status": "ACTIVE",
                    "id": "dXRItTIr5",
                    "user_id": "firstUser"
                }]))
        cy.visit('http://localhost:3000')
    })

    it('should redirect to todo page', () => {
        cy.get('.login-title').should('have.text', 'Task management')
    })
    it('should edit successfully', () => {
        cy.get('.ToDo__item span').should('have.length', 3);
        cy.get('.ToDo__item span').eq(1).dblclick().then(()=> {
            cy.get('.input-todo-item input')
                .type('myNewData').should('have.value', '111111myNewData')
                .type('{enter}')
        })

        cy.get('.ToDo__item span').eq(1).should('have.text', '111111myNewData')
    })
})
describe('Edit Flow', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'testabc.xyz.ahk')
        localStorage.setItem('my-todo',
            JSON.stringify([
                {
                    "content": "ghfghf12235",
                    "created_date": "2021-11-28T15:35:58.075Z",
                    "status": "ACTIVE",
                    "id": "wLwGB8L1Y",
                    "user_id": "firstUser"
                }, {
                    "content": "111111",
                    "created_date": "2021-11-28T15:35:43.726Z",
                    "status": "ACTIVE",
                    "id": "etCtZUYce",
                    "user_id": "firstUser"
                }, {
                    "content": "asdasd",
                    "created_date": "2021-11-28T15:35:39.655Z",
                    "status": "ACTIVE",
                    "id": "dXRItTIr5",
                    "user_id": "firstUser"
                }]))
        cy.visit('http://localhost:3000')
    })

    it('should redirect to todo page', () => {
        cy.get('.login-title').should('have.text', 'Task management')
    })
    it('should delete successfully', () => {
        cy.get('.ToDo__item span').should('have.length', 3);
        cy.get('.ToDo__item .Todo__delete').eq(1).click()
        cy.get('.ToDo__item span').eq(1).should('not.have.text', '111111')
        cy.get('.ToDo__item span').should('have.length', 2);
    })
})