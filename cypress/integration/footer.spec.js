describe('Footer', () => {

    before(() =>{
        cy.visit('http://localhost:4200?language=en')
    });

    it('has a date', () => {
        cy.get('footer-component')
            .should('be.visible')
            .should('contain.text', 'QSA')
            .should('contain.text', '2018 - ');
    });

    it('has creators', () => {
        cy.get('footer-component')
            .should('contain.text', 'Dr. Sztrik János')
            .should('contain.text', 'Szászi Szabolcs')
            .should('contain.text', 'Szilágyi Zoltán')
    })

});
