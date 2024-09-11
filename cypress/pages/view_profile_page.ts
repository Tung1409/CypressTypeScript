import { BasePage } from "./base_page";

export class ViewProfilePage extends BasePage {
    private btnEditProfile = "a[href='https://unsplash.com/account']"
    private imageNameElem = "a[itemprop='contentUrl']"
    private totalLikeNumberElem = "a[data-testid='user-nav-link-likes'] span span"
    private likesCategory = this.categoryElem('likes')
    private collectionsCategory = this.categoryElem('collections')
    public categoryElem(category: string): string {
        return `a[data-testid='user-nav-link-${category}']`
    }

    private imageTitleElem(title: string): string {
        return `a[title="${title}"]`
    }

    viewProfile() {
        cy.get(this.btnEditProfile).click();
    }

    verifyUserFullName(fullName: string) {
        cy.xpath(`//div[text()="${fullName}"]`).should('be.visible')
    }

    openLikesCategory() {
        cy.get(this.likesCategory).click()
    }

    openCollectionsCategory() {
        cy.get(this.collectionsCategory).click()
    }

    isImageWithTitleDisplayed(title: string): Cypress.Chainable<boolean> {
        const selector = this.imageTitleElem(title)
        return cy.get(selector).should('be.visible').then(() => true)
    }

    verifyImagesAreDisplayed(titles: string[]) {
        cy.get(this.imageNameElem).should('be.visible')
        titles.forEach((title) => {
            this.isImageWithTitleDisplayed(title)
        })
    }

    verifyTotalLikesNumberDisplay(totalLikesNumber: number) {
        cy.get(this.totalLikeNumberElem).should('have.text', totalLikesNumber.toString())
    }

    viewCollections(collectionName: string) {
        cy.xpath(`//div[text()="${collectionName}"]`).click()
    }


}