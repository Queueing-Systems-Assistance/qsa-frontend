import * as systemInputs from "./systemInputs";

export function createTable() {
    testTable(false);
    cy.get('#Lambda')
        .type('2');
    cy.get('#Mu')
        .type('3');
    systemInputs.testCalculateButton(true, true);
    testTable(true);
}
export function testTable(exist) {
    cy.get('tab-table-component')
        .should(exist ? 'exist' : 'not.exist');
}
