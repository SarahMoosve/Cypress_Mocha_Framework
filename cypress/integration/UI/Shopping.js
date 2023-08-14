/// <reference types="Cypress" />

import ShopPage from "../pageObject/ShopPage"
import HomePage from "../pageObject/HomePage"

describe('Shopping', function() {

    const shoppage = new ShopPage()
    const homepage = new HomePage()

    before(function() {
        //const context = this
        cy.fixture('example').then(function(data) {
            this.data = data;
            //context.data = data
        })
    })

    beforeEach(function() {
        cy.visit(Cypress.env('url') + "/angularpractice/")
        //cy.type(Cypress.env('userId').type(Cypress.env('password'))
        homepage.getShopTab().click()
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        shoppage.getCheckout().click();
    })

    it('When I want to verify the items prices with the total price', function() {
        let sum = 0
        shoppage.getAmountOfAll().each(($el, index, $list) => {
            const actualAmount = $el.text()
            const result = actualAmount.split(" ")[1].trim()
            sum += Number(result)
        }).then(function() {
            cy.log(sum)
            shoppage.getTotalAmount().then(function($el) {
                const totalAmount = Number($el.text().split(" ")[1].trim())
                expect(sum).to.equal(totalAmount)
            })
        })
    })

   /* it('When I want to continue shopping and go back to previous page', function() {
        cy.visit('https://rahulshettyacademy.com/angularpractice/');
        homepage.getShopTab().click();
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element);
        });
        shoppage.getCheckout().click();
        // Click on continue shopping button
        shoppage.getContinueShopping().click();

        // Now you are back on the previous page
        // You can add your assertions or further actions here
    });*/

    after(function() {
        shoppage.getProceedToPayment().click()
        shoppage.getLocation().type(this.data.SearchDeliveryLocation)
        shoppage.getDeliverLocation().click()
        
        
        //Cypress.config('defaultCommandTimeout', 8000)
        
        // Use with caution; forcing interactions should be a last resort.
        shoppage.getCheckout().click({ force: true })

        shoppage.getPurchase().click()
        cy.successMessage(this.data.successMessage)
    });

});