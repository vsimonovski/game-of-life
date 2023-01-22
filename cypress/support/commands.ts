// @ts-check
/// <reference types="cypress" />

Cypress.Commands.add('clickCell', (cellNum) => {
  cy.get('[data-cy="cell"]').eq(cellNum).click();
});

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});
