import * as app from '../support/app';
import * as systemSelectionList from "../support/systemSelectionList";
import * as systemInputs from "../support/systemInputs";
import * as toast from "../support/toast";
import * as tables from "../support/tables";

describe('Schemes Tables', () => {

    before(() => {
        cy.visit('http://localhost:4200/schemes?language=en');
        app.addNewTab();
        app.navigateToScheme('schemesCardTable');
    });

    it('has system selection list', () => {
        systemSelectionList.testSystemListAll();
    });

    it('has multiple inputs', () => {
        systemInputs.testSystemInputsSize(5);
    });

    it('has toast error', () => {
        systemInputs.testCalculateButton(true, true);
        toast.testToastError();
    });

    it('can create a table', () => {
        tables.createTable();
    });

    it('can remember state', () => {
        app.navigateToTab(1);
        app.navigateToScheme('schemesCardTable');
        app.navigateToTab(2);
        systemInputs.testEmptySystemViewInputs(false);
        systemSelectionList.testSystemList(true);
        tables.testTable(true);
    });

    it('can change selected system', () => {
        systemSelectionList.selectSystem('systemMM2');
        tables.testTable(false);
        systemInputs.testSystemInputsIsEmpty('Lambda');
        systemInputs.testSystemInputsIsEmpty('Mu');
    });

    it('can delete tab', () => {
        tables.createTable();
        app.deleteCurrentTab();
        app.addNewTab();
        app.navigateToScheme('schemesCardTable');
        checkCurrentTabSchemeIsNew();
        systemSelectionList.selectSystem('systemMM1');
        systemInputs.testSystemInputsIsEmpty('Lambda');
        systemInputs.testSystemInputsIsEmpty('Mu');
    });

    it('can switch schemes', () => {
        tables.createTable();
        app.changeCurrentTab();
        app.navigateToScheme('schemesCardTable');
        checkCurrentTabSchemeIsNew();
        systemSelectionList.selectSystem('systemMM1');
        systemInputs.testSystemInputsIsEmpty('Lambda');
        systemInputs.testSystemInputsIsEmpty('Mu');
    });

    function checkCurrentTabSchemeIsNew() {
        systemInputs.testEmptySystemViewInputs(true);
        systemSelectionList.testSystemList(true);
        tables.testTable(false);
    }

});
