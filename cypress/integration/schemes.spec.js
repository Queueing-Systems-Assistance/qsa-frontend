describe('Schemes', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/schemes?locale=en')
    });

    it('has a tab with dropdown', () => {
        cy.get('#btnGroupDropDownTabItem')
            .should('not.be.visible')
            .get('#btnGroupDropTabItem')
            .click()
            .get('#btnGroupDropDownTabItem')
            .should('be.visible')
            .get('#btnGroupDropTabItem')
            .click()
            .get('#btnGroupDropDownTabItem')
            .should('not.be.visible')
    });

    it('has a tab add option', () => {
        cy.get('scheme-tab-item-component')
            .should('have.length', 1)
            .get('#newTabButton')
            .should('be.visible')
            .click()
            .get('scheme-tab-item-component')
            .should('have.length', 2)
            .get('scheme-tab-item-component:nth-child(2) > ul > li > div')
            .should('have.attr', 'ng-reflect-router-link-active', 'active')
            .get('scheme-tab-item-component:nth-child(1) > li > div')
            .should('not.have.attr', 'ng-reflect-router-link-active', 'active')
    });

    it('has a tab delete option with modal', () => {
        cy.get('tab-delete-modal')
            .should('not.be.visible');
        cy.get('scheme-tab-item-component')
            .get('#newTabButton')
            .click()
            .get('#tabItemClose')
            .click({force: true});
        cy.get('tab-delete-modal')
            .should('be.visible')
            .get('div.modal-footer > button:nth-child(2)')
            .click();
        cy.get('tab-delete-modal')
            .should('not.be.visible');
        cy.get('scheme-tab-item-component')
            .should('have.length', 1);
    });

    it('has a tab rename option with modal', () => {
        cy.get('tab-rename-modal')
            .should('not.be.visible');
        cy.get('scheme-tab-item-component')
            .get('#newTabButton')
            .click()
            .get('#tabItemRename')
            .click({force: true});
        cy.get('tab-rename-modal')
            .should('be.visible')
            .get('#rename-input')
            .type('New Tab Name');
        cy.get('tab-rename-modal')
            .get('div.modal-footer > button:nth-child(1)')
            .click();
        cy.get('tab-rename-modal')
            .should('not.be.visible');
        cy.get('scheme-tab-item-component')
            .contains('New Tab Name');
    });

    it('has a tab type change option with modal', () => {
        cy.get('tab-change-modal')
            .should('not.be.visible');
        cy.get('#schemesCardTable')
            .should('be.visible')
            .click()
            .get('#schemesCardTable')
            .should('not.be.visible');
        cy.get('#tabItemChangeTabType')
            .click({force: true});
        cy.get('tab-change-modal')
            .should('be.visible')
            .get('div.modal-footer > button:nth-child(2)')
            .click();
        cy.get('#schemesCardTable')
            .should('be.visible');
        cy.get('tab-change-modal')
            .should('not.be.visible')
    })

});
