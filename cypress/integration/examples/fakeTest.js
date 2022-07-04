/*
    Using cypress, we can mock http requests/response data which is not possible using selenium
*/

/// <reference types = "Cypress" />
"use strict";

describe("Test Suite", () => {
  it("Mocking Test in Cypress", () => {
    cy.visit(Cypress.env("url") + "angularAppdemo/");

    //cy.intercept({ requestObject }, { responseObject });
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          { book_name: "RestAssured with Java", isbn: "RSU", aisle: "2301" },
        ],
      }
    ).as("bookretrievals");
    cy.get("body > app-root > app-landingpage > div > button").click();
    cy.wait("@bookretrievals");
    cy.get("p").should("have.text", "Oops only 1 Book available");
  });
  it("Checking length of response array equals the no. of rows in table", () => {
    cy.visit(Cypress.env("url") + "angularAppdemo/");
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          { book_name: "RestAssured with Java", isbn: "RSU", aisle: "2301" },
        ],
      }
    ).as("bookRetrievals");
    cy.get("body > app-root > app-landingpage > div > button").click();
    cy.wait("@bookRetrievals").should(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    cy.get("p").should("have.text", "Oops only 1 Book available");
  });
});
