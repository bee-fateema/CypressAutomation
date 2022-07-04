/*
    Using cypress, we can mock http requests/response data which is not possible using selenium
    security testing using cypress
*/

/// <reference types = "Cypress" />
"use strict";

describe("Test Suite", () => {
  it("Mocking Test in Cypress", () => {
    cy.visit(Cypress.env("url") + "angularAppdemo/");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
        req.continue((res) => {
          // expect(res.statusCode).to.equal(403);
        });
      }
    ).as("dummyUrl");
    cy.get("body > app-root > app-landingpage > div > button").click();
    cy.wait("@dummyUrl");
  });
});
