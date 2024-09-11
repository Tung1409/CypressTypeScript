import { BasePage } from "./base_page"

export class EditProfilePage extends BasePage {
    private txtUserName = "#user_username"
    private btnUpdateAccount = "input[value='Update account']"
    private txtFirstName = "#user_first_name"
    private txtLastName = "#user_last_name"

    editUserName(newUserName: string) {
        cy.get(this.txtUserName).clear().type(newUserName)
        cy.get(this.btnUpdateAccount).click()
    }


    getUserFullName() {
        cy.get(this.txtFirstName)
            .invoke('val')
            .then((firstName) => {
                return cy.get(this.txtLastName)
                    .invoke('val')
                    .then((lastName) => `${(firstName as string).trim()} ${(lastName as string).trim()}`);
            })
            .then(fullName => cy.wrap(fullName).as('fullName'));
    }
}