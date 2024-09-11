import { Fixture } from '../data-object/fixtures';
import { User } from '../data-object/user';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';
import { ViewProfilePage } from '../pages/view_profile_page';
import { PhotoServices } from '../services/photo_services';
import { UserServices } from '../services/user_services';
import * as allure from "allure-cypress";

describe('like 3 random photos and verify photos are present in user profile', () => {
    const userServices = new UserServices();
    const photoServices = new PhotoServices();
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const viewProfilePage = new ViewProfilePage();
    let users: Fixture<User>;

    beforeEach(() => {
        userServices.getUsername().then(username => {
            userServices.getUserLikedPhotos(username).then(likedPhotosResponse => {
                const photos = likedPhotosResponse.body;
                photos.forEach(photo => {
                    photoServices.unlikePhoto(photo.id);
                });
            });
        })
        cy.fixture<Fixture<User>>('login.json').then((data) => {
            users = data;
        });
    });

    it('like photos successfully', () => {
        const user = users['user_01']

        allure.step('like photo', () => {

            cy.visit('')
            loginPage.header.navigateToLoginPage()
            loginPage.login(user.username, user.password)
            homePage.getAndLikeRandomImages(3).then((titles) => {
                loginPage.header.selectProfileMenuItem('View profile');
                cy.reload();
                viewProfilePage.openLikesCategory();
                viewProfilePage.verifyTotalLikesNumberDisplay(3);
                viewProfilePage.verifyImagesAreDisplayed(titles);
            })
        });

    });
});

