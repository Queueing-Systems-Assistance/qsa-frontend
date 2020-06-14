import * as app from "../support/app";
import * as tables from "../support/tables";
import * as systemInputs from "../support/systemInputs";
import * as systemSelectionList from "../support/systemSelectionList";

describe('Schemes Compare Tables', () => {

    before(() => {
        cy.visit('http://localhost:4200/schemes?language=en');
        app.navigateToScheme('schemesCardCompareTable')
    });

    it('ha an empty view', () => {
        systemInputs.testEmptySystemViewInputs(true);
        createNewSchemeWithTable('systemMM1');
        createNewSchemeWithTable('systemMM2');
        createNewSchemeWithTable('systemMMInf');
        app.navigateToTab(1);
        systemInputs.testEmptySystemViewInputs(false);
    });

    it('has 3 tables in the list', () => {
        testTableListItemIsVisible('1', 'M | M | 1');
        testTableListItemIsVisible('2', 'M | M | 2');
        testTableListItemIsVisible('3', 'M | M | ∞');
    });

    it('can select 2 items only', () => {
        systemInputs.testCalculateButton(false);
        testTableListItem('1', true, false);
        systemInputs.testCalculateButton(false);
        testTableListItem('2', true, false);
        systemInputs.testCalculateButton(true);
        testTableListItem('3', false, false);
    });

    it('can change selected items', () => {
        testTableListItem('2', true, true);
        systemInputs.testCalculateButton(false);
        testTableListItem('3', true, false);
        systemInputs.testCalculateButton(true);
    });

    it('can create compare table', () => {
        testCompareTable(false);
        systemInputs.testCalculateButton(true, true);
        testCompareTable(true);
    });

    it('can remove selected tables', () => {
       app.navigateToTab(2);
       app.deleteCurrentTab();
       app.navigateToTab(3);
       app.deleteCurrentTab();
       app.navigateToTab(1);
       testCompareTable(true);

    });

    function testCompareTable(exist) {
        cy.get('compare-table-component')
            .should(exist ? 'exist' : 'not.exist');
    }

    function testTableListItem(id, selectable, checked) {
        cy.get('#' + id)
            .should(selectable ? 'not.be.disabled' : 'be.disabled');
        if (selectable) {
            cy.get('#' + id)
                .should(checked ? 'be.checked' : 'not.be.checked')
                .click({force: true})
                .should(checked ? 'not.be.checked' : 'be.checked')
        }
    }

    function testTableListItemIsVisible(id, name) {
        cy.get('#' + id)
            .parent()
            .should('be.visible')
            .should('contain.text', name);
    }

    function createNewSchemeWithTable(systemId) {
        app.addNewTab();
        app.navigateToScheme('schemesCardTable');
        systemSelectionList.selectSystem(systemId);
        tables.createTable(systemId);
    }


});
