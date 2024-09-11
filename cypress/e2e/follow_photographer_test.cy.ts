import { Fixture } from "../data-object/fixtures";
import { User } from "../data-object/user";
import { AuthorProfilePage } from "../pages/author_profile_page";
import { HomePage } from "../pages/home_page";
import { LoginPage } from "../pages/login_page";
import { PhotoDetail } from "../pages/photo_detail";
import * as allure from "allure-cypress";

describe('follow a random photographer', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const photoDetail = new PhotoDetail()
  const authorProfilePage = new AuthorProfilePage()
  let users: Fixture<User>;

  beforeEach(() => {
    cy.fixture<Fixture<User>>('login.json').then((data) => {
      users = data;
    });
  });
  it('follow photographer successfully', () => {
    const user = users['user_01']

    allure.step('follow photographer', () => {
      
      cy.visit('')
      loginPage.header.navigateToLoginPage()
      loginPage.login(user.username, user.password)
      homePage.clickOnImage('3')
      photoDetail.viewAuthorProfile()
      authorProfilePage.clickOnMoreActions()
      authorProfilePage.followAuthor()
      authorProfilePage.verifyFollowSuccessfully()
      authorProfilePage.unfollowAuthor()
    })
  })
})