/*
Select a product and add to the cart then proceed to checkout and place the order
*/
/// <reference types = "Cypress" />
"use strict";
//test suite
describe("Test suite!!!", () => {
  //test case
  it("Adding to Cart Test!", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    //Parent-child chaining
    cy.get(".products").as("productLocator"); //Aliasing
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          //click the element
          cy.wrap($el).find("button").click();
        }
      });
    cy.get(".cart-icon>img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
  });
});
