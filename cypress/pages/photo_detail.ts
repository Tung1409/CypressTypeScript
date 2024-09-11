import { BasePage } from "./base_page";

export class PhotoDetail extends BasePage {
    private authorIcon = 'div[data-testid="photos-route"] header img'
    private btnViewProfile = '//a[text()="View profile"]'
    private btnDownload = "//a[text()='Download']"

    viewAuthorProfile() {
        cy.get(this.authorIcon).realHover()
        cy.xpath(this.btnViewProfile).click()
    }

    downloadImage() {
        cy.xpath(this.btnDownload).click()
        cy.wait(5000)
    }

    getAuthorName(): Cypress.Chainable<string> {
        return cy.get(this.authorIcon).invoke('attr', 'alt').then(altText => {
            const authorName = altText.match(/Go to (.+?)'s profile/)?.[1]
            cy.log('Author Name: ' + authorName)
            return cy.wrap(authorName)
        })
    }
}