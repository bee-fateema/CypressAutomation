class PostCheckoutPage {
  constructor() {}
  selectCountry(country) {
    cy.get("#country").type(country);
    //explicitly changing configuration value
    // Cypress.config("defaultCommandTimeout", 8000);
    cy.get(".suggestions ul li a").click();
  }
  termsAndConditionsPlusPurchase() {
    cy.get("input[type='checkbox']").click({ force: true });
    cy.get("input[value='Purchase']").click();
  }
  verifySuccessfulPurchase() {
    // cy.get(".alert").should("have.text","Success! Thank you! Your order will be delivered in next few weeks :-). "); <-- this won't work cuz we need to verify substring text
    cy.get(".alert").then((element) => {
      const actualText = element.text();
      //if cannot find direct comparison then do partial comparison
      expect(actualText.includes("Success")).to.be.true;
    });
  }
}
export default PostCheckoutPage;
