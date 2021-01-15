describe("Arlaide login", () => {
  // Replace it with your groupe address
  const arlaideUrl = Cypress.env('ARLAIDE_URL') || 'http://localhost:8080';
  it("should allow user to login", () => {
    cy.visit(arlaideUrl);
    cy.get('#1-email').type('e2e@arla-sigl.fr');
    cy.get('[name="password"]').type('ArlaSigl2021!!');
    cy.get('[aria-label="Log In"]').click();
    cy.get('h1').contains('Frontend Workshop').should('be.visible')
  })
})
