import * as systemSelectionList from "../support/systemSelectionList";
import * as systemInputs from "../support/systemInputs";

describe('Home', () => {

    before(() => {
        cy.visit('http://localhost:4200/home?language=en');
    });

    it('has a title', () => {
        cy.contains('QSA Application');
    });

    it('has scheme selection cards', () => {
        cy.get('home-selection-component')
            .should('exist')
            .should('have.length', 2);
    });

    it('has a systems scrollable layout', () => {
        cy.get('home-systems-component')
            .should('exist');
    });

    it('has a kendall notation', () => {
        cy.get('home-kendall-component')
            .should('exist');
    });

    it('can select kendall notation characters', () => {
        cy.get('home-kendall-component > div > a:nth-child(3)')
            .should('not.have.class','active');
        cy.get('home-kendall-component > div > a:nth-child(3)')
            .trigger('mouseover')
            .should('have.class','active');
    });

    it('can select system schemes', () => {
        systemSelectionList.testSystemList(false);
        systemInputs.testEmptySystemViewInputs(false);
        cy.get('home-selection-component > div')
            .first()
            .click({force: true});
        systemInputs.testEmptySystemViewInputs(true);
        systemSelectionList.testSystemList(true);

    });

});
