import { BasePage } from "./base_page";

export class HomePage extends BasePage {

    private imageElem(number: string): string {
        return `figure[data-masonryposition="${number}"]`
    }

    clickOnImage(number: string) {
        cy.get(this.imageElem(number)).click({ force: true })
    }

    private generateRandomIndices(totalImages: number, imageCount: number): number[] {
        const indexList: number[] = [];

        while (indexList.length < totalImages) {
            const randomIndex = Math.floor(Math.random() * imageCount) + 1;

            if (!indexList.includes(randomIndex)) {
                indexList.push(randomIndex);
            }
        }

        return indexList;
    }

    getAndLikeRandomImages(totalImages: number): Cypress.Chainable<string[]> {
        return cy.get('figure[data-testid="photo-grid-masonry-figure"]').filter(':visible').then(($images) => {
            const imageCount = $images.length;
            if (imageCount < totalImages) {
                throw new Error(`Not enough images available. Requested ${totalImages}, but found only ${imageCount}.`);
            }

            const randomIndices = this.generateRandomIndices(totalImages, imageCount);
            let imageTitles: string[] = []

            randomIndices.forEach((index) => {
                const indexStr = index.toString();
                this.photoComponent.getImageTitle(indexStr)
                    .then((title) => {
                        imageTitles.push(title);
                    });
                this.photoComponent.likePhoto(indexStr);
            });

            return cy.wrap(imageTitles);
        });
    }

    private getPhotoTitle(): Cypress.Chainable<string> {
        return cy.get('button[title="Zoom in on this image"] img[alt]').invoke('attr', 'alt')
    }

    public getPhotoIdFromUrl(): Cypress.Chainable<string> {
        return this.getPhotoTitle().then((title) => {
            const urlTitle: string = title.toLowerCase().replace(/[^\w]+/g, "-");
            cy.log('urlTitle ' + urlTitle)
            cy.url().then((currentUrl) => {
                let urlSplit: string[] = currentUrl.split(urlTitle + '-');
                return urlSplit[urlSplit.length - 1];
            })
        });
    }

    // selectRandomImage(): Cypress.Chainable<string> {
    //     return cy.get('figure:has(a[title="Download this image"])')
    //         // .filter(':visible')
    //         .then(($images) => {
    //             const imageCount = $images.length;
    //             if (imageCount === 0) {
    //                 throw new Error('No images found');
    //             }
    //             cy.log('generate random indice')
    //             const randomIndices = this.generateRandomIndices(1, imageCount);
    //             const randomImage = $images[randomIndices[0]];
    //             cy.wrap(randomImage).click();
    //             cy.get('button[title="Zoom in on this image"]').should('be.visible');
    //             cy.log('get photo id')
    //             return this.getPhotoIdFromUrl();
    //         })
    //         .then((photoId) => {
    //             cy.log('imageId :' + photoId);
    //             return cy.wrap(photoId);
    //         });
    // }

    selectRandomImage(): Cypress.Chainable<string> {
        return cy.get('figure:has(a[title="Download this image"])')
        .its('length')  
        .then((imageCount) => {
            if (imageCount === 0) {
                throw new Error('No images found');
            }
            const randomIndex = this.generateRandomIndices(1, imageCount)[0];
            return cy.get('figure:has(a[title="Download this image"])')
                     .eq(randomIndex) 
                     .click();
        })
        .then(() => {
            cy.get('button[title="Zoom in on this image"]').should('be.visible');
            return this.getPhotoIdFromUrl();
        })
        .then((photoId) => {
            cy.log('imageId :' + photoId);
            return cy.wrap(photoId);
        });
    }

}