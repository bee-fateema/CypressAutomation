/*
 Working with Web controls UI like dropdowns, checkboxes etc.
*/
/// <reference types = "Cypress" />
"use strict";

describe("Handling Web Controls UI", () => {
  it("Selecting Checkboxes", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
    cy.get("input[type='checkbox']").check(["option2", "option3"]);
  });
  it("Selecting Radio Button", () => {
    cy.get("input[value='radio2']")
      .check()
      .should("be.checked")
      .and("have.value", "radio2");
    cy.get("input[value='radio3']").check();
    cy.get("input[value='radio2']").should("not.be.checked");
    cy.get("input[value='radio3']").should("be.checked");
  });
  it("Selecting from Static Dropdown", () => {
    //select('value')
    cy.get("select").select("option2").should("have.value", "option2");
  });
  it("Selecting from Dynamic Dropdown", () => {
    cy.get("#autocomplete").type("ind");
    cy.get(".ui-menu-item div").each(($el, index, $list) => {
      if ($el.text() === "India") {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "India");
  });
  it("Working on visible and invisible elements in a Web page", () => {
    cy.get("input[id='displayed-text']").should("be.visible");
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.get("#show-textbox").click();
    cy.get("input[id='displayed-text']").should("be.visible");
  });
});
