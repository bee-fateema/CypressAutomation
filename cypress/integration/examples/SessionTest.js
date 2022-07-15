/// <reference types = "Cypress" />
"use strict";
const neatCSV = require("neat-csv");
describe("JWT Session", () => {
  let productName;
  it("is logged in through local storage", () => {
    cy.LoginAPI().then(() => {
      //Set the token in local storage before visiting the site
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
    cy.get(".card-body b")
      .eq(1)
      .then((element) => {
        productName = element.text();
      });
    cy.get(".card-body button:last-of-type").eq(1).click();
    //   cy.get("[routerlink*='cart']").click();
    //   cy.contains("Checkout").click();
    //   cy.get("[placeholder*='Country']").type(" India");

    //   // cy.get(
    //   //   "section[class=\"ta-results list-group ng-star-inserted\"] i[class='fa fa-search']"
    //   // )
    //   //   .trigger()
    //   //   .each(($element, index, $list) => {
    //   //     const actualText = $element.text();
    //   //     if (actualText.trim() === " India") {
    //   //       cy.wrap($element).click();
    //   //     }
    //   //   });

    //   cy.get(
    //     "div[class='form__cc'] div[class='field small']:nth-child(2) input[class='input txt']"
    //   ).type("673");
    //   cy.get(
    //     "div[class='form__cc'] div[class='field'] input[class='input txt']"
    //   ).type("Bee Shiras");
    //   cy.get("input[name='coupon']").type("Rahul");
    //   cy.get("div[class='form__cc'] div[class='field small'] button").click();
    //   cy.get(".action__submit").click();
    //   cy.wait(2000);
    //   cy.get(".order-summary button").click();

    //Dynamically creating project path and reading csv file
    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_zigkrist.csv"
    ).then(async (text) => {
      const csv = await neatCSV(text);
      console.log(csv);
      const actualProuctCSV = csv[0]["Product Name"];
      console.log(actualProuctCSV);
      expect(productName).to.equal(actualProuctCSV);
    });
  });
});
