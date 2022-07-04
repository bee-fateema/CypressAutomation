/// <reference types = "Cypress" />
"use strict";

describe("API Testing with reqres.in", () => {
  const Urlr = "https://reqres.in/";
  it("API Get Test for single user", () => {
    cy.request("GET", Urlr + "api/users/2").then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  it("API Post Test", () => {
    cy.request("POST", Urlr + "api/users", {
      name: "morpheus",
      job: "leader",
    })
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "leader");
      })
      .its("body")
      .should("include", {
        name: "morpheus",
        job: "leader",
      });
  });
  it("API Put Test", () => {
    cy.request("PUT", Urlr + "api/users/2", {
      name: "morpheus",
      job: "zion resident",
    })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "zion resident");
      })
      .its("body")
      .should("include", {
        name: "morpheus",
        job: "zion resident",
      });
  });
  it("API Patch Test", () => {
    cy.request("PATCH", Urlr + "api/users/2", {
      name: "morpheus",
      job: "zion resident",
    })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "zion resident");
      })
      .its("body")
      .should("include", {
        name: "morpheus",
        job: "zion resident",
      });
  });
  it("API Delete Test", () => {
    cy.request("DELETE", Urlr + "api/users/2").then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
