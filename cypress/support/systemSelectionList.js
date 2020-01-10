import * as systemInput from './systemInputs';

export function testSystemListAll() {

    // empty system view exists
    systemInput.testEmptySystemViewInputs(true);

    // can select a system
    cy.get('#systemMM2')
        .should('not.be.checked');
    selectSystem('systemMM2');
    cy.get('#systemMM2')
        .should('be.checked');

    // empty system view not exists
    systemInput.testEmptySystemViewInputs(false);

    // cannot select multiple systems
    selectSystem('systemMM1');
    cy.get('#systemMM2')
        .should('not.be.checked')
        .get('#systemMM1')
        .should('be.checked');
}

export function testSystemList(exist) {
    cy.get('system-selection-component')
        .should(exist ? 'exist' : 'not.exist');
}

export function selectSystem(systemId) {
    cy.get('system-selection-component')
        .get('li')
        .get('#' + systemId)
        .click({force: true});
}
