import { BasePage } from "./base_page"

export class AuthorProfilePage extends BasePage{
    private btnMoreActions = "button[title='More Actions']"
    private photoCategory = "a[data-testid='user-nav-link-photos']"
    private btnFollow = "//button[contains(text(), 'Follow')]"
    private btnUnfofllow = "//button[contains(text(), 'Unfollow')]"

    clickOnMoreActions() {
        cy.get(this.photoCategory).should('be.visible')
        cy.get(this.btnMoreActions).click()
    }

    followAuthor(){
        cy.xpath(this.btnFollow).click()
    }

    verifyFollowSuccessfully() {
        cy.xpath(this.btnUnfofllow).should('be.visible')
    }

    unfollowAuthor(){
        cy.xpath(this.btnUnfofllow).click()
    }

}