import { Fixture } from "../data-object/fixtures";
import { User } from "../data-object/user";
import { EditProfilePage } from "../pages/edit_profile_page";
import { LoginPage } from "../pages/login_page";
import { ViewProfilePage } from "../pages/view_profile_page";
import { StringUtils } from "../utility/string_utils";
import * as allure from "allure-cypress";

describe('edit username in profie page', () => {
  const loginPage = new LoginPage();
  const viewProfilePage = new ViewProfilePage();
  const editProfilePage = new EditProfilePage();
  let users: Fixture<User>;

  beforeEach(() => {
    cy.fixture<Fixture<User>>('login.json').then((data) => {
      users = data;
    });
  });
  it('edit successfully', () => {
    const user = users['user_01']
    const newUserName = StringUtils.createRandomUsername();
    
    allure.step('edit profile', () => {

      cy.visit('')
      loginPage.header.navigateToLoginPage()
      loginPage.login(user.username, user.password)
      loginPage.header.selectProfileMenuItem('View profile')
      viewProfilePage.viewProfile()
      editProfilePage.getUserFullName()
      editProfilePage.editUserName(newUserName)
      cy.visit(`/@${newUserName}`)
      cy.get('@fullName').then((fullName) => {
        viewProfilePage.verifyUserFullName(fullName as unknown as string)
      })
    })
  })
})