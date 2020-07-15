export function testToastInfo() {
    getToastContainer()
        .should('be.visible')
        .get('.toast-error')
        .should('be.visible')
}

export function testToastError() {
    getToastContainer()
        .should('be.visible')
        .get('.toast-error')
        .should('be.visible')
}

function getToastContainer() {
    return cy.get('#toast-container')
}
