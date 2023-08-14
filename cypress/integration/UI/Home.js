/// <reference types="Cypress" />
import HomePage from "../pageObject/HomePage"

describe('Home Page', function(){

    before(function()  {
            cy.fixture('example').then(function(data)
            {
                    this.data=data
            })   
        
            })


it('My first testcase', function()
{
    const homepage=new HomePage()

    cy.visit(Cypress.env('url') + "/angularpractice/")

    //fetching data from the fixtures.
    homepage.getName().type(this.data.name)   
    homepage.getEmail().type(this.data.email)
    homepage.getPassword().type(this.data.password)
    homepage.getGender().select(this.data.gender).should('have.value', 'Female')
    homepage.getEmploymentStatus().check().should('be.checked')
    homepage.getDateOfBirth().type(this.data.DateofBirth)
    homepage.getBindingTextField().should('have.value', this.data.name)
    homepage.getName().should('have.attr', 'minlength', '2')
    homepage.getDisabledButton().should('be.disabled')
    homepage.getSubmit().click()
    homepage.getSuccess().contains("The Form has been submitted successfully!.")
    homepage.getShopTab().click()
})
})