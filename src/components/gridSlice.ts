import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { initialiseGrid } from 'utils/grid';
import { GRID_SIZE } from 'config';
import { Grid } from 'types/Grid';

interface GridState {
  isSimulationRunning: boolean;
  cells: Grid;
  numOfLivingCells: number;
  numOfGenerations: number;
}

const initialState: GridState = {
  isSimulationRunning: false,
  cells: initialiseGrid(GRID_SIZE),
  numOfLivingCells: 0,
  numOfGenerations: 0,
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    SIMULATION_START: (state) => {
      state.isSimulationRunning = true;
    },
    SIMULATION_PAUSE: (state) => {
      state.isSimulationRunning = false;
    },
    SIMULATION_RESET: () => initialState,
    SIMULATION_RANDOMISE: (state) => {
      state.cells = initialiseGrid(GRID_SIZE, true);
      state.numOfGenerations = 0;
      state.numOfLivingCells = 0;
      state.cells.forEach(
        (rows, rowId) =>
          (state.numOfLivingCells += rows.filter(
            (_, colId) => state.cells[rowId][colId]
          ).length)
      );
    },
    SET_CELL_VALUE: {
      reducer(state, action: PayloadAction<{ rowId: number; colId: number }>) {
        const { rowId, colId } = action.payload;
        state.numOfLivingCells = state.cells[rowId][colId]
          ? state.numOfLivingCells - 1
          : state.numOfLivingCells + 1;
        state.cells[rowId][colId] = !state.cells[rowId][colId];
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
    INCREASE_GENERATION_NUM: (state) => {
      state.numOfGenerations += 1;
    },
  },
});

export const {
  SIMULATION_START,
  SIMULATION_PAUSE,
  SIMULATION_RESET,
  SIMULATION_RANDOMISE,
  SET_CELL_VALUE,
  INCREASE_GENERATION_NUM,
} = gridSlice.actions;

export const selectSimulationStatus = (state: RootState) =>
  state.grid.isSimulationRunning;
export const selectCells = (state: RootState) => state.grid.cells;
export const selectNumOfLivingCells = (state: RootState) =>
  state.grid.numOfLivingCells;
export const selectNumOfGenerations = (state: RootState) =>
  state.grid.numOfGenerations;

export default gridSlice.reducer;
