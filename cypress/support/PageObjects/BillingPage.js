class BillingPage {
  constructor() {}

  verifyBillingTotal() {
    var sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each((element, index, list) => {
        const amount = element.text();
        var result = amount.split(" ");
        result = result[1].trim();
        //convert the value to integer then sum it
        sum += Number(result);
      })
      .then(() => {
        cy.log(sum);
      });
    cy.get("td h3 strong").then((total) => {
      const amount = total.text();
      var integerTotal = amount.split(" ");
      integerTotal = integerTotal[1].trim();
      expect(Number(integerTotal)).to.equal(sum);
    });
  }
  goToCheckout() {
    return cy.contains("Checkout");
  }
}
export default BillingPage;
