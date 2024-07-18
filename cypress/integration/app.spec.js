describe('NY Times Most Popular Articles App', () => {
    it('displays articles and shows details when clicked', () => {
      cy.visit('/');
      cy.contains('NY Times Most Popular Articles');
  
      cy.get('.article-item').first().click();
      cy.get('.article-detail').should('be.visible');
    });
  });
  