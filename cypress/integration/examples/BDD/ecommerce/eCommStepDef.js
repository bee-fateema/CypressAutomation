import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../support/PageObjects/HomePage";
import ProductPage from "../../../../support/PageObjects/ProductPage";
import BillingPage from "../../../../support/PageObjects/BillingPage";
import PostCheckoutPage from "../../../../support/PageObjects/PostCheckoutPage";

//node_modules/.bin/cypress run --spec cypress/integration/examples/BDD/ecommerce.feature --headed --browser chrome <-- running feature files
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome  <-- running tags
//Add cucumber report options in package.json -> output.json
//use html report plugin ,create js file (pass the details of output.json)
//run js file -> node cucumber-html-reports.json
const homePage = new HomePage();
const postCheckoutPage = new PostCheckoutPage();
const billingPage = new BillingPage();
const productPage = new ProductPage();
let Jdata, name;

Given("I open Ecommerce page", () => {
  homePage.visitHomePage();
});

When("I add items to cart", function () {
  homePage.getShopTab().click();
  Jdata = this.Jsondata;
  Jdata.productName.forEach((element) => {
    cy.selectProduct(element);
  });
  productPage.goToCheckout().click();
});

And("Validate the total prices", () => {
  billingPage.verifyBillingTotal();
  billingPage.goToCheckout().click();
});

Then("select the country, submit and verify Success", () => {
  postCheckoutPage.selectCountry("India");
  postCheckoutPage.termsAndConditionsPlusPurchase();
  postCheckoutPage.verifySuccessfulPurchase();
});

When("I fill the form details", (dataTable) => {
  name = dataTable.rawTable[1][0];
  homePage.getEditBox().type(name);
  homePage
    .getGender()
    .select(dataTable.rawTable[1][1])
    .should("have.value", "Female");
});

Then("validate the form behaviour", () => {
  //Validate the text box has the correct value from input
  homePage.getTwoWayDatabinding().should("have.value", name);
  //Validate the attribute, i.e., minimum character length is 2
  homePage.getEditBox().should("have.attr", "minlength", "2");
  //Validate the radio button is disabled
  homePage.getEntrepreneur().should("be.disabled");
});

And("select the shop page", () => {
  homePage.getShopTab().click();
});
