export function testSystemInputsIsEmpty(systemInputId) {
    cy.get('#' + systemInputId)
        .should('have.value', '0');
}

export function testSystemInputsSize(numberOfInputs) {
    cy.get('system-input-component')
        .should('exist');
}

export function testSystemInputs(exist) {
    cy.get('system-input-component')
        .should(exist ? 'exist' : 'not.exist');
}

export function testEmptySystemViewInputs(exist) {
    cy.get('empty-system-views-component')
        .should(exist ? 'exist' : 'not.exist');
}

export function testCalculateButton(isClickable, shouldClick) {
    cy.get('#buttonCalculate')
        .should(isClickable ? 'not.be.disabled' : 'be.disabled')
        .should('be.visible');
    if (shouldClick) {
        cy.get('#buttonCalculate')
            .click();
    }
}
