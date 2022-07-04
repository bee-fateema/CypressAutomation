/*
    Cyrpess Framework
*/
/// <reference types = "Cypress" />
"use strict";
import HomePage from "../../support/PageObjects/HomePage";
import ProductPage from "../../support/PageObjects/ProductPage";
import BillingPage from "../../support/PageObjects/BillingPage";
import PostCheckoutPage from "../../support/PageObjects/PostCheckoutPage";

// This shows in Cypress docs but doesn't work here
// describe("Cypress Framework", () => {
//   before(() => {
//     cy.fixture("example").then((data) => {
//       this.data = data;
//     });
//   });
//   it("Function 1 for now", () => {
//     cy.visit(Cypress.env("url") + "angularpractice/");
//     cy.get(
//       "body > app-root > form-comp > div > form > div:nth-child(1) > input"
//     ).type(this.data.name);
//     cy.get("#exampleFormControlSelect1")
//       .select(this.data.gender)
//       .should("have.value", "Female");
//   });
// });

//Alternate method got on own
describe("Cypress Framework", () => {
  // let Jdata;
  before(() => {
    // cy.fixture("example").then((data) => {
    //   Jdata = data;
    // });
    cy.fixture("example.json").as("Jsondata");
  });
  //   it("Data Driven testing with fixtures", () => {
  //     cy.visit(Cypress.env("url") + "angularpractice/");
  //     cy.get(
  //       "body > app-root > form-comp > div > form > div:nth-child(1) > input"
  //     ).type(Jdata.name);
  //     cy.get("#exampleFormControlSelect1")
  //       .select(Jdata.gender)
  //       .should("have.value", "Female");
  //   });
  //   it("Validating attribute properties and their behaviour with cypress assertions", () => {
  //     //Validate the text box has the correct value from input
  //     cy.get("body > app-root > form-comp > div > h4 > input").should(
  //       "have.value",
  //       Jdata.name
  //     );
  //     //Validate the attribute, i.e., minimum character length is 2
  //     cy.get(
  //       "body > app-root > form-comp > div > form > div:nth-child(1) > input"
  //     ).should("have.attr", "minlength", "2");
  //     //Validate the radio button is disabled
  //     cy.get("#inlineRadio3").should("be.disabled");
  //   });
  //   it("Building custom cypress commands", () => {
  //     cy.visit(Cypress.env("url") + "angularpractice/");
  //     cy.get("li:nth-child(2) a").click();
  //     //selectProduct() - created custom cypress command in commands.js
  //     cy.selectProduct("Blackberry");
  //     cy.selectProduct("Nokia Edge");
  //   });
  //   it("Parameterized data with multiple inputs", () => {
  //     cy.visit(Cypress.env("url") + "angularpractice/");
  //     cy.get("li:nth-child(2) a").click();
  //     Jdata.productName.forEach((element) => {
  //       cy.selectProduct(element);
  //     });
  //   });
  //   To pause a testing -> cy.pause()
  it("Page Object Design Pattern", () => {
    //create object to import the methods
    const homePage = new HomePage();

    homePage.visitHomePage();
    homePage.getEditBox().type(Jdata.name);
    homePage.getGender().select(Jdata.gender).should("have.value", "Female");

    //Validate the text box has the correct value from input
    homePage.getTwoWayDatabinding().should("have.value", Jdata.name);
    //Validate the attribute, i.e., minimum character length is 2
    homePage.getEditBox().should("have.attr", "minlength", "2");
    //Validate the radio button is disabled
    homePage.getEntrepreneur().should("be.disabled");
    homePage.getShopTab().click();

    //Product Page
    const productPage = new ProductPage();
    // Jdata.productName.forEach((element) => {
    //   cy.selectProduct(element);
    // });
    let Jdata = this.Jsondata;
    Jdata.productName.forEach((element) => {
      cy.selectProduct(element);
    });
    productPage.goToCheckout().click();

    //Billing Page
    const billingPage = new BillingPage();
    billingPage.verifyBillingTotal();
    billingPage.goToCheckout().click();

    //Post Checkout Page
    const postCheckoutPage = new PostCheckoutPage();
    postCheckoutPage.selectCountry("India");
    postCheckoutPage.termsAndConditionsPlusPurchase();
    postCheckoutPage.verifySuccessfulPurchase();
  });
});
