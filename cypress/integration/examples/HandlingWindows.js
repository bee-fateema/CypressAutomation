/*
 Handling Alerts, Pop-ups, Child Windows etc
*/
/// <reference types = "Cypress" />
/// <reference types = "cypress-iframe"/>
import "cypress-iframe";
("use strict");

describe("Handling Alerts, Popups", () => {
  it("Pop-ups", () => {
    cy.visit(Cypress.env("url") + "AutomationPractice/");
    cy.get("#alertbtn").click();
    cy.get('[value="Confirm"]').click();
    //Check the string in the Alert window - use window:alert
    cy.on("window:alert", (str) => {
      //Mocha
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
    //Cypress automatically clicks the 'OK' button in the pop-up window after 'Confirm' button is clicked
    cy.on("window:confirm", (str) => {
      //Mocha
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
  });
  it("Handling Child Windows", () => {
    //1st Approach
    //removeAttr is jquery - removing 'target' attribute will allow the child window to open in the same tab
    cy.get("#opentab").invoke("removeAttr", "target").click();
    //Retrieve URL and assertion to verify
    cy.url().should("include", "shettyacademy");
    //Navigating back and forth between windows
    cy.go("back");

    //2nd Approach
    //prop() helps to get the property value - jquery
    //this will work only on the sub domain url, not unique domain url changes
    cy.get("#opentab").then((element) => {
      const Url = element.prop("href");
      cy.visit(Url);
    });
  });
  it("Handling Web Tables", () => {
    //td is the child of tr,  td:nth-child(2) is the 2nd td element under tr
    cy.visit(Cypress.env("url") + "AutomationPractice/");
    cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Python")) {
        //cannot get text directly so resolve the problem with promise
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then((price) => {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    });
  });
  it("Handling Mouse Hover", () => {
    //Cypress doen;st support mouse hover function, so to achieve this, take the help of jQuery
    //invoke is jquery language
    //'show' should be targetted to the immediate parent element
    cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Top").click();
    cy.url().should(
      "include",
      "https://rahulshettyacademy.com/AutomationPractice/#top"
    );
    cy.visit(Cypress.env("url") + "AutomationPractice/");
    cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Reload").click();
    cy.url().should("include", Cypress.env("url") + "AutomationPractice/");
    //force click on element even if it is hidden
    cy.contains("Top").click({ force: true });
    cy.go("back");
  });
  it("Handling iFrames", () => {
    //install package to hanlde frames - npm install -D cypress-iframe
    //import the package - <reference types = "cypress-iframe"/>
    //import 'cypress-iframe
    cy.visit(Cypress.env("url") + "AutomationPractice/");
    cy.frameLoaded("#courses-iframe");
    //switch to iframe mode
    cy.iframe().find("a[href*='mentorship']").eq(0).click();
    // cy.iframe().find("h1[class*='pricing-title']").should("have.length", 2);
    // cy.iframe().find("div[class*='inner-box']>h1").should("have.text", "MENTORSHIP");
  });
});
