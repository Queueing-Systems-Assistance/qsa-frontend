describe('Documentation', () => {

    before(() => {
        cy.visit('http://localhost:4200/documentation?language=en');
    });

    it('has multiple documentation', () => {
        testSection('systems');
        testSection('systemInput');
        testSection('table');
        testSection('chart');
    });

    it('can expand a section', () => {
        cy.get('documentation-url-component')
            .should('not.be.visible')
            .get('[data-target="#systems"]')
            .click()
            .get('documentation-url-component')
            .should('be.visible');
    });

    it('has section url', () => {
        cy.get('documentation-url-component')
            .should('exist');
    });

    it('has section parameter table', () => {
        cy.get('documentation-table-component')
            .should('exist');
    });

    it('has section examples', () => {
        cy.get('documentation-example-component')
            .should('exist');
    });

    it('has notification when copied url to clipboard', () => {
        cy.get('#buttonCopyClipboardDocumentationUrl')
            .click()
            .get('#toast-container')
            .should('be.visible')
            .should('contain.text', 'Copied to clipboard')
            .get('.toast-info')
            .should('be.visible');
    });

    it('has notification when copied json to clipboard', () => {
        cy.reload();
        cy.get('#buttonCopyClipboardJsonExample')
            .click({force: true})
            .get('#toast-container')
            .should('be.visible')
            .should('contain.text', 'Copied to clipboard')
            .get('.toast-info')
            .should('be.visible');
    });

    function testSection(sectionId) {
        cy.get('[data-target="#' + sectionId + '"]')
            .should('exist');
    }

});
