class HomePage {
  constructor() {}
  visitHomePage() {
    return cy.visit(Cypress.env("url") + "angularpractice/");
    //change or set url from command prompt -> node_module\.bin\cypress run --spec <file-path> --env url=http://sampleurl.com --headed
  }
  getEditBox() {
    return cy.get(
      "body > app-root > form-comp > div > form > div:nth-child(1) > input"
    );
  }
  getTwoWayDatabinding() {
    return cy.get("body > app-root > form-comp > div > h4 > input");
  }
  getGender() {
    return cy.get("#exampleFormControlSelect1");
  }
  getEntrepreneur() {
    return cy.get("#inlineRadio3");
  }
  getShopTab() {
    return cy.get("li:nth-child(2) a");
  }
}

export default HomePage;
