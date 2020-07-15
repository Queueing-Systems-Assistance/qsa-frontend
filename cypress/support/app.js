export function deleteCurrentTab() {
    cy.get('#tabItemClose').click({ force: true })
    cy.get('tab-delete-modal')
        .get('div.modal-footer > button:nth-child(2)')
        .click()
}

export function addNewTab() {
    cy.get('scheme-tab-item-component').get('#newTabButton').click()
}

export function changeCurrentTab() {
    cy.get('#tabItemChangeTabType').click({ force: true })
    cy.get('tab-change-modal')
        .get('div.modal-footer > button:nth-child(2)')
        .click()
}

export function navigateToScheme(schemeId) {
    cy.get('#' + schemeId)
        .should('exist')
        .click({ force: true })
        .get('#' + schemeId)
        .should('not.be.visible')
}

export function navigateToTab(tabNumber) {
    cy.get('scheme-tab-item-component:nth-child(' + tabNumber + ')').click()
}
