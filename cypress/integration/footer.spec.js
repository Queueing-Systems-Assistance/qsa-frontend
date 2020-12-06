describe('Footer', () => {

    before(() =>{
        cy.visit('http://localhost:4200?locale=en')
    });

    it('has a date', () => {
        cy.get('footer-component')
            .should('be.visible')
            .should('contain.text', 'QSA')
            .should('contain.text', '2018 - ');
    });

    it('has creators', () => {
        cy.get('footer-component')
            .should('contain.text', 'Dr. János Sztrik')
            .should('contain.text', 'Szabolcs Szászi')
            .should('contain.text', 'Zoltán Szilágyi')
            .should('contain.text', 'Csanád Kölcsei')
    })

});
