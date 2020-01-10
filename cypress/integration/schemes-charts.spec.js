import * as app from "../support/app";
import * as systemSelectionList from "../support/systemSelectionList";
import * as systemInputs from "../support/systemInputs";
import * as toast from "../support/toast";

describe('Schemes Charts', () => {

    before(() => {
        cy.visit('http://localhost:4200/schemes?language=en');
        app.addNewTab();
        app.navigateToScheme('schemesCardChart');
    });

    it('has system selection list', () => {
        systemSelectionList.testSystemListAll();
    });

    it('has a dropdown', () => {
        systemInputs.testSystemInputs(false);
        selectXAxisInput('Lambda');
        systemInputs.testSystemInputs(true);
    });

    it('has multiple inputs', () => {
        systemInputs.testSystemInputsSize(8);
    });

    it('has toast error', () => {
        systemInputs.testCalculateButton(true, true);
        toast.testToastError();
    });

    it('can create a chart', () => {
        createChart();
    });

    it('can remember state', () => {
        app.navigateToTab(1);
        app.navigateToScheme('schemesCardChart');
        app.navigateToTab(2);
        systemInputs.testEmptySystemViewInputs(false);
        systemSelectionList.testSystemList(true);
        testChart(true);
    });


    it('can change selected system', () => {
        systemSelectionList.selectSystem('systemMM2');
        systemInputs.testSystemInputs(false);
        testChart(false);
        selectXAxisInput('Lambda');
        systemInputs.testSystemInputs(true);
    });

    it('can delete tab', () => {
        createChart();
        app.deleteCurrentTab();
        app.addNewTab();
        app.navigateToScheme('schemesCardChart');
        checkCurrentTabSchemeIsNew();
    });

    it('can switch schemes', () => {
        createChart();
        app.changeCurrentTab();
        app.navigateToScheme('schemesCardChart');
        checkCurrentTabSchemeIsNew();
    });

    function checkCurrentTabSchemeIsNew() {
        systemInputs.testEmptySystemViewInputs(true);
        systemSelectionList.testSystemList(true);
        testChart(false);
        systemSelectionList.selectSystem('systemMM1');
        systemInputs.testSystemInputs(false);
        selectXAxisInput('Lambda');
        systemInputs.testSystemInputs(true);
        systemInputs.testSystemInputsIsEmpty('Mu');
        systemInputs.testSystemInputsIsEmpty('n');
        systemInputs.testSystemInputsIsEmpty('t');
        systemInputs.testSystemInputsIsEmpty('r');
    }

    function createChart() {
        testChart(false);
        cy.get('#from')
            .type('1');
        cy.get('#to')
            .type('10');
        cy.get('#steps')
            .type('1');
        cy.get('#Mu')
            .type('11');
        cy.get('#n')
            .type('4');
        cy.get('#t')
            .type('5');
        cy.get('#r')
            .type('6');
        systemInputs.testCalculateButton(true, true);
        testChart(true);
    }

    function testChart(visible) {
        cy.get('chart-figure-component')
            .should(visible ? 'visible' : 'not.visible');
    }

    function selectXAxisInput(systemInputId) {
        cy.get('system-input-drop-down-component')
            .should('exist');
        cy.get('#xAxisInputSelect')
            .click({force: true})
            .get('#' + systemInputId)
            .click({force: true});
    }

});
