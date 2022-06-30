//cypress code - Spec
/// <reference types = "Cypress" />
"use strict";
//test suite
describe("Test suite!!!", () => {
  //test case
  it("Test cases goes here!", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    //assertion - should keyword comes from Chai library
    cy.get(".product:visible").should("have.length", 4);
    //Parent-child chaining
    cy.get(".products").as("productLocator"); //Aliasing
    cy.get("@productLocator").find(".product").should("have.length", 4);
    cy.get("@productLocator")
      .find(".product")
      .eq(2)
      .contains("ADD TO CART")
      .click()
      .then(() => {
        console.log("sf");
      });
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          //click the element
          cy.wrap($el).find("button").click();
        }
      });
    //Assert Text
    cy.get(".brand").should("have.text", "GREENKART");
    //Get text using promise
    cy.get(".brand").then(function (logoElement) {
      //text() is not a cypress command, it's a jquery method
      cy.log(logoElement.text());
    });
  });
});
