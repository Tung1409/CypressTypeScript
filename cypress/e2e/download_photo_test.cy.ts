import { Fixture } from "../data-object/fixtures";
import { User } from "../data-object/user";
import { HomePage } from "../pages/home_page";
import { LoginPage } from "../pages/login_page";
import { PhotoDetail } from "../pages/photo_detail";
import { StringUtils } from "../utility/string_utils";
import * as path from 'path';
import * as allure from "allure-cypress";

describe('download a random photo then verify the downloaded file', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const photoDetail = new PhotoDetail();
  let users: Fixture<User>;

  beforeEach(() => {
    cy.fixture<Fixture<User>>('login.json').then((data) => {
      users = data;
    });
  });
  it('download photo successfully', () => {
    const user = users['user_01']
    
    allure.step('download photo', () =>{
      cy.visit('')
      loginPage.header.navigateToLoginPage()
      loginPage.login(user.username, user.password)
      homePage.selectRandomImage().then(imageId => {
        photoDetail.getAuthorName().then(authorName => {
          photoDetail.downloadImage()
          const imagePath = StringUtils.createImagePath(authorName, imageId)
          cy.log('image Path :' + imagePath)
          const downloadsFolder = Cypress.config('downloadsFolder')
          cy.readFile(path.join(downloadsFolder, imagePath)).should('exist');
        })
      })
    })
  })
})