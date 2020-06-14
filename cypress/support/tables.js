import * as systemInputs from "./systemInputs";

export function createTable(systemId) {
    testTable(false);
    cy.get('#Lambda')
        .type('2');
    cy.get('#Mu')
        .type('3');
    if (systemId === 'systemMM2') {
        cy.get('#n')
            .type('1')
        cy.get('#t')
            .type('1')
    }
    systemInputs.testCalculateButton(true, true);
    testTable(true);
}
export function testTable(exist) {
    cy.get('tab-table-component')
        .should(exist ? 'exist' : 'not.exist');
}
