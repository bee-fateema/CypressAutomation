class ProductPage {
  constructor() {}
  goToCheckout() {
    return cy.get("#navbarResponsive > ul > li > a");
  }
}
export default ProductPage;
