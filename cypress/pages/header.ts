export class Header {
    private btnProfileMenu = "button[title='Your personal menu button']"
    private imgProfile = "img[role='presentation']"
    private menuItemElem(menuItem: string): string {
        return `//a[text()="${menuItem}"]`
    }
    navigateToLoginPage() {
        cy.get('header a').contains('Log in').first().click({ force: true })
    }

    selectProfileMenuItem(menuItem: string) {
        cy.get(this.imgProfile).should('be.visible')
        cy.get(this.btnProfileMenu).click()
        cy.xpath(this.menuItemElem(menuItem)).click()
    }
}