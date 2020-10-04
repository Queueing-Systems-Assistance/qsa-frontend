import * as app from "../support/app";
import * as systemSelectionList from "../support/systemSelectionList";
import * as systemInputs from "../support/systemInputs";

describe('Schemes Default', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/schemes?locale=en');
    });

    it('can select table section', () => {
        systemSelectionList.testSystemList(false);
        systemInputs.testEmptySystemViewInputs(false);
        app.navigateToScheme('schemesCardTable');
        systemInputs.testEmptySystemViewInputs(true);
        systemSelectionList.testSystemList(true);
    });

    it('can select chart section', () => {
        systemSelectionList.testSystemList(false);
        systemInputs.testEmptySystemViewInputs(false);
        app.navigateToScheme('schemesCardChart');
        systemInputs.testEmptySystemViewInputs(true);
        systemSelectionList.testSystemList(true);
    });

    it('can select compare tables section', () => {
        systemInputs.testEmptySystemViewInputs(false);
        app.navigateToScheme('schemesCardCompareTable');
        systemInputs.testEmptySystemViewInputs(true);
    });
});
