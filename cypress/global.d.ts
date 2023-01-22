/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickCell(num): Chainable<any>;

    getBySel(
      dataTestAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
  }
}
