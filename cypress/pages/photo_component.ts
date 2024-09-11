export class PhotoComponent{

    private btnDownload = "a[title='Download this image']"

    private imageTitleElem(number: string): string {
        return `figure[data-masonryposition="${number}"] a[itemprop="contentUrl"]`
    }

    private btnAddToCollectionElem(number: string): string {
        return `figure[data-masonryposition="${number}"] button[title="Add this image to a collection"]`
    }

    private heartBtnElem(number: string): string {
        return `figure[data-masonryposition="${number}"] button[title="Like this image"]`
    }

    getImageTitle(number: string): Cypress.Chainable<string> {
        return cy.get(this.imageTitleElem(number))
            .invoke('attr', 'title')
            .then((title) => {
                if (!title) {
                    throw new Error(`Title attribute is missing for image at position: ${number}`);
                }
                return title
            })
    }

    clickOnAddToCollectionBtn(number: string) {
        cy.get(this.btnAddToCollectionElem(number)).click({ force: true })
    }

    likePhoto(number: string) {
        const heartBtnSelector = this.heartBtnElem(number);
        cy.get(heartBtnSelector).click({ force: true })
    }

    downloadImage(){
        cy.get(this.btnDownload).click()
    }
}