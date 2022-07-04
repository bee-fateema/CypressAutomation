/// <reference types = "Cypress" />
"use strict";

describe("API Testing using Cypress", () => {
  it("API Test", () => {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation with Java",
      isbn: "bcdgsss",
      aisle: "22s7",
      author: "John foe",
    }).then((response) => {
      expect(response.body).to.have.property("Msg", "successfully added");
      expect(response.status).to.equal(200);
    });
  });
});
