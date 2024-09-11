import { BasePage } from "./base_page"

export class LoginPage extends BasePage {
    private txtUsername = "input[name='email']"
    private txtPassword = "input[name='password']"
    private btnLogin = "button[value='Login']"

    login(username: string, password: string) {
        cy.get(this.txtUsername).type(username)
        cy.get(this.txtPassword).type(password)
        cy.get(this.btnLogin).click()
    }

}