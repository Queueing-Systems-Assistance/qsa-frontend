describe('Header', () => {

    before(() => {
        cy.visit('http://localhost:4200?locale=en')
    })

    it('has i18n support', () => {
        cy.visit('http://localhost:4200?locale=en')
            .contains('QSA Application')
        cy.visit('http://localhost:4200?locale=hu')
            .contains('QSA Alkalmazás')
    });

    it('has a header [desktop]', () => {
        cy.viewport(1920, 1190);
        cy.get('header-component')
            .should('be.visible')
            .get('li.nav-item')
            .should('be.visible')
            .should('have.length', 7)
            .get('li.nav-item.active')
            .should('have.length', 1);
        cy.get('header-component')
            .get('body > app-component > div > header-component > nav > button')
            .should('not.be.visible')
    });

    it('has a header [mobile]', () => {
        cy.viewport(765, 1190);
        cy.get('header-component')
            .should('be.visible')
            .get('li.nav-item')
            .should('have.length', 7)
            .get('li.nav-item.active')
            .should('have.length', 1);
        cy.get('header-component')
            .get('body > app-component > div > header-component > nav > button')
            .should('be.visible')
            .click()
    });

    it('has an about modal', () => {
        cy.get('#navbarCollapse > ul > li:nth-child(4) > a')
            .click();
        cy.get('about-modal')
            .should('be.visible')
            .get('.close')
            .click()
            .get('about-modal')
            .should('not.be.visible')
    });

});
