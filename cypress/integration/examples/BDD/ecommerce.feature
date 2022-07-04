Feature: : End to end Ecommerce Validation

    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to cart
    And Validate the total prices
    Then select the country, submit and verify Success

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    |name |gender|
    |Bee  |Female|
    Then validate the form behaviour
    And select the shop page
