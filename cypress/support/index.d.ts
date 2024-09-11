/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        xpath(locator: string, option?: Partial<Loggable & Timeoutable>): Chainable<Element>;
    }
}