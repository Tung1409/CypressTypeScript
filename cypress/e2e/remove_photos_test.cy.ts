import { Fixture } from '../data-object/fixtures';
import { User } from '../data-object/user';
import { CollectionPage } from '../pages/collection_page';
import { LoginPage } from '../pages/login_page';
import { ViewProfilePage } from '../pages/view_profile_page';
import { CollectionServices } from '../services/collection_services';
import { PhotoServices } from '../services/photo_services';
import { StringUtils } from '../utility/string_utils';
import * as allure from "allure-cypress";

describe('remove photos from user profile', () => {
    const photoServices = new PhotoServices();
    const collectionServices = new CollectionServices();
    const loginPage = new LoginPage();
    const viewProfilePage = new ViewProfilePage();
    const collectionPage = new CollectionPage();
    let users: Fixture<User>;
    const collectionTitle = StringUtils.createRandomTitle();
    let newCollectionId = null;

    beforeEach(() => {
        photoServices.getRandomPhoto('2').then((response) => {
            const randomPhotos = response.body;
            const photoIds = randomPhotos.map((photo: any) => photo.id);
            expect(photoIds.length).to.equal(2);

            collectionServices.createNewCollection(collectionTitle, { isPrivate: true })
                .then((createResponse) => {
                    newCollectionId = createResponse.body.id;
                    cy.wrap(photoIds).each((photoId: string) => {
                        collectionServices.addPhotoIntoCollection(newCollectionId, photoId)
                    });
                });
        });
        cy.fixture<Fixture<User>>('login.json').then((data) => {
            users = data;
        });
    });

    afterEach(() => {
        collectionServices.deleteCollection(newCollectionId)
    });

    it('remove photo successfully', () => {
        const user = users['user_01']

        allure.step('remove photo', () => {

            cy.visit('')
            loginPage.header.navigateToLoginPage()
            loginPage.login(user.username, user.password)
            loginPage.header.selectProfileMenuItem('View profile');
            viewProfilePage.openCollectionsCategory()
            viewProfilePage.viewCollections(collectionTitle)
            collectionPage.removeARandomImageFromCollection(collectionTitle).then((title) => {
                cy.reload()
                cy.visit(`/collections/${newCollectionId}`)
                collectionPage.verifyImageIsNotAvailable(title)
            })
        })
    });
});

