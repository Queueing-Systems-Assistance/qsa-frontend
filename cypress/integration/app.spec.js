describe('App', () => {
    it('redirects to home page', () => {
        cy.visit('http://localhost:4200/asdf')
            .location('pathname')
            .should('eq', '/home')
    })

    it('redirects to default scheme', () => {
        cy.visit('http://localhost:4200/schemes/4')
            .location('pathname')
            .should('eq', '/schemes/0')
    })

    it('has i18n support [en]', () => {
        cy.visit('http://localhost:4200?language=en').contains(
            'QSA Application'
        )
    })

    it('has i18n support [hu]', () => {
        cy.visit('http://localhost:4200?language=hu').contains('QSA Alkalmazás')
    })

    it('has a cookie notification', () => {
        cy.visit('http://localhost:4200/home?language=en')
        cy.clearCookies()
        cy.wait(2000)
            .get('#toast-container')
            .should('be.visible')
            .should('contain.text', 'This website uses cookies')
            .get('.toast-info')
            .should('be.visible')
    })
})
