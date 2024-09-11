import { extend } from "cypress/types/lodash";
import { PhotoComponent } from "./photo_component";
import { BasePage } from "./base_page";

export class CollectionPage extends BasePage{

    private collectionTitleElem(title: string): string {
        return `//span[text()="${title}"]`
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

    removeARandomImageFromCollection(collectionTitle: string): Cypress.Chainable<string> {
        return cy.get('figure[data-testid="photo-grid-masonry-figure"]').filter(':visible').then(($images) => {
            const imageCount = $images.length;
            if (imageCount < 1) {
                throw new Error(`Not enough images available. Requested 1, but found only ${imageCount}.`);
            }
    
            const randomIndice = this.generateRandomIndices(1, imageCount);
            const indexStr = randomIndice.toString();
    
            return this.photoComponent.getImageTitle(indexStr).then((title) => {
                this.photoComponent.clickOnAddToCollectionBtn(indexStr);
                this.selectCollection(collectionTitle);
    
                return cy.wrap(title);
            });
        });
    }

    selectCollection(collectionTitle: string) {
        cy.xpath(this.collectionTitleElem(collectionTitle)).click()
    }

    verifyImageIsNotAvailable(title: string){
        cy.get(`a[title="${title}"]`).should('not.exist')
    }
}