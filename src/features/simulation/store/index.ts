import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { GRID_SIZE } from '@/config';
import { Cells } from '../types';
import { countNeighbourCells, initialiseCells } from '../utils/cell';

interface SimulationState {
  hasLivingCells: boolean;
  cells: Cells;
  numOfLivingCells: number;
  numOfGenerations: number;
}

const initialState: SimulationState = {
  hasLivingCells: false,
  cells: initialiseCells(GRID_SIZE),
  numOfLivingCells: 0,
  numOfGenerations: 0,
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    SIMULATION_RESET: () => initialState,
    SIMULATION_RANDOMISE: (state) => {
      state.cells = initialiseCells(GRID_SIZE, true);
      state.numOfGenerations = 0;
      state.numOfLivingCells = 0;
      state.cells.forEach(
        (rows, rowId) =>
          (state.numOfLivingCells += rows.filter(
            (_, colId) => state.cells[rowId][colId]
          ).length)
      );
      state.hasLivingCells = !!state.numOfLivingCells;
    },
    SIMULATION_NEXT: (state) => {
      state.numOfGenerations += 1;
      state.cells = state.cells.map((rows, rowId) =>
        rows.map((cols, colId) => {
          const count = countNeighbourCells(
            GRID_SIZE,
            state.cells,
            rowId,
            colId
          );

          if (state.cells[rowId][colId] && (count < 2 || count > 3)) {
            state.numOfLivingCells -= 1;
            return false;
          }

          if (!state.cells[rowId][colId] && count === 3) {
            state.numOfLivingCells += 1;
            return true;
          }

          return cols;
        })
      );
      state.hasLivingCells = !!state.numOfLivingCells;
    },
    CELL_TOGGLE: {
      reducer(state, action: PayloadAction<{ rowId: number; colId: number }>) {
        const { rowId, colId } = action.payload;
        state.numOfLivingCells = state.cells[rowId][colId]
          ? state.numOfLivingCells - 1
          : state.numOfLivingCells + 1;
        state.cells[rowId][colId] = !state.cells[rowId][colId];
        state.hasLivingCells = !!state.numOfLivingCells;
      },
      prepare(rowId, colId) {
        return {
          payload: {
            rowId,
            colId,
          },
        };
      },
    },
  },
});

export const {
  SIMULATION_RESET,
  SIMULATION_RANDOMISE,
  SIMULATION_NEXT,
  CELL_TOGGLE,
} = simulationSlice.actions;

export const selectNumOfLivingCellsStatus = (state: RootState) =>
  state.simulation.hasLivingCells;
export const selectCells = (state: RootState) => state.simulation.cells;
export const selectNumOfLivingCells = (state: RootState) =>
  state.simulation.numOfLivingCells;
export const selectNumOfGenerations = (state: RootState) =>
  state.simulation.numOfGenerations;
