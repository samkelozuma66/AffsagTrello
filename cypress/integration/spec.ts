describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('button').trigger('click')
    cy.get('[id=key]').type('1d9fb201fbd3349e6549e776f210d9fc')
    cy.get('button').trigger('click')
    cy.get('[id=token]').type('65b4737cef3499ab25e684370c65313b462aef447bd280b358c97f5dfb56db63')
    
    cy.get('button').trigger('click')
  })
})
