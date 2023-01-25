import { INTERVAL_MS } from '../../src/config';

describe('/', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays title', () => {
    cy.getBySel('title').should('be.visible');
  });

  it('select cells in grid, observe button behaviour, observe stats', () => {
    cy.getBySel('run-btn').should('be.disabled');
    cy.getBySel('next-btn').should('be.disabled');
    cy.getBySel('randomise-btn').should('not.be.disabled');
    cy.getBySel('reset-btn').should('be.disabled');

    cy.clickCell(0);
    cy.clickCell(1);

    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(0)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(1)
        .should('have.css', 'background-color', colors.liveCell);
    });

    cy.getBySel('generations-label').contains(0);
    cy.getBySel('living-cells-label').contains(2);

    cy.getBySel('run-btn').should('not.be.disabled');
    cy.getBySel('next-btn').should('not.be.disabled');
    cy.getBySel('randomise-btn').should('not.be.disabled');
    cy.getBySel('reset-btn').should('not.be.disabled');

    cy.clickCell(0);
    cy.getBySel('living-cells-label').contains(1);
    cy.clickCell(1);
    cy.getBySel('living-cells-label').contains(0);
  });

  it('select cells, start and reset simulation, observe button behaviour, observe stats', () => {
    cy.clock();

    cy.clickCell(300);
    cy.clickCell(340);
    cy.clickCell(380);

    cy.getBySel('living-cells-label').contains(3);
    cy.getBySel('run-btn').click();

    cy.tick(INTERVAL_MS);

    cy.getBySel('living-cells-label').contains(3);
    cy.getBySel('generations-label').contains(1);
    cy.getBySel('next-btn').should('be.disabled');
    cy.getBySel('randomise-btn').should('be.disabled');
    cy.getBySel('reset-btn').should('not.be.disabled');
    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(300)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(339)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(340)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(341)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(380)
        .should('have.css', 'background-color', colors.deadCell);
    });

    cy.tick(INTERVAL_MS);

    cy.getBySel('run-btn').contains('Stop simulation');
    cy.getBySel('living-cells-label').contains(3);
    cy.getBySel('generations-label').contains(2);
    cy.getBySel('next-btn').should('be.disabled');
    cy.getBySel('randomise-btn').should('be.disabled');
    cy.getBySel('reset-btn').should('not.be.disabled');
    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(300)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(339)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(340)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(341)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(380)
        .should('have.css', 'background-color', colors.liveCell);
    });

    cy.getBySel('reset-btn').click();
    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(300)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(339)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(340)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(341)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(380)
        .should('have.css', 'background-color', colors.deadCell);
    });

    cy.getBySel('run-btn').should('be.disabled').contains('Start simulation');
    cy.getBySel('next-btn').should('be.disabled');
    cy.getBySel('randomise-btn').should('not.be.disabled');
    cy.getBySel('reset-btn').should('be.disabled');

    cy.getBySel('living-cells-label').contains(0);
    cy.getBySel('generations-label').contains(0);
  });
});
