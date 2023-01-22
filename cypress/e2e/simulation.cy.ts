import { INTERVAL_MS } from '../../src/config';

describe('/', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('display title', () => {
    cy.getBySel('title').contains('Game of Life');
  });

  it('display simulation control buttons', () => {
    cy.getBySel('run-btn').contains('Start simulation');
    cy.getBySel('reset-btn').contains('Reset');
    cy.getBySel('randomise-btn').contains('Randomise');
  });

  it('display simulation stats', () => {
    cy.getBySel('generations-label').contains('Generations');
    cy.getBySel('living-cells-label').contains('Living Cells');
  });

  it('requires non empty cells to start simulation', () => {
    cy.getBySel('run-btn').should('be.disabled');
    cy.clickCell(0);
    cy.getBySel('run-btn').should('not.be.disabled');
  });

  it('requires non empty cells to reset simulation', () => {
    cy.getBySel('reset-btn').should('be.disabled');
    cy.clickCell(0);
    cy.getBySel('run-btn').should('not.be.disabled');
  });

  it('should correctly update number of living cells', () => {
    cy.getBySel('living-cells-label').contains(0);

    cy.clickCell(0);
    cy.getBySel('living-cells-label').contains(1);

    cy.clickCell(1);
    cy.getBySel('living-cells-label').contains(2);

    cy.clickCell(1);
    cy.getBySel('living-cells-label').contains(1);
  });

  it('should correctly update number of generations', () => {
    cy.clock();

    cy.getBySel('living-cells-label').contains('0');
    cy.clickCell(0);
    cy.getBySel('run-btn').click();

    cy.tick(INTERVAL_MS);

    cy.getBySel('living-cells-label').contains('1');
  });

  it('should display Stop simulation when simulation is running', () => {
    cy.clock();

    cy.clickCell(0);
    cy.getBySel('run-btn').click();

    cy.tick(INTERVAL_MS);

    cy.get('[data-cy="run-btn"]').contains('Stop simulation');
  });

  it('should reset grid when Reset button is clicked', () => {
    cy.clock();

    cy.clickCell(0);
    cy.clickCell(1);
    cy.clickCell(2);

    cy.getBySel('run-btn').click();
    cy.tick(INTERVAL_MS);

    cy.getBySel('reset-btn').click();

    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(0)
        .should('have.css', 'background-color', colors.deadCell);
    });
  });

  it('should generate cells as expected', () => {
    cy.clock();

    cy.clickCell(300);
    cy.clickCell(340);
    cy.clickCell(380);

    cy.getBySel('run-btn').click();
    cy.tick(INTERVAL_MS);

    cy.fixture('colors').then((colors) => {
      cy.getBySel('cell')
        .eq(300)
        .should('have.css', 'background-color', colors.deadCell);
      cy.getBySel('cell')
        .eq(340)
        .should('have.css', 'background-color', colors.liveCell);
      cy.getBySel('cell')
        .eq(380)
        .should('have.css', 'background-color', colors.deadCell);
    });
  });
});
