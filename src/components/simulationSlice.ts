import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { countNeighbourCells, initialiseCells } from 'utils/cell';
import { GRID_SIZE, NEIGHBOUR_CELL_COORDINATES } from 'config';
import { Cells } from 'types';

interface SimulationState {
  isSimulationRunning: boolean;
  cells: Cells;
  numOfLivingCells: number;
  numOfGenerations: number;
}

const initialState: SimulationState = {
  isSimulationRunning: false,
  cells: initialiseCells(GRID_SIZE),
  numOfLivingCells: 0,
  numOfGenerations: 0,
};

export const simulationSlice = createSlice({
  name: 'simulation',
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
      state.cells = initialiseCells(GRID_SIZE, true);
      state.numOfGenerations = 0;
      state.numOfLivingCells = 0;
      state.cells.forEach(
        (rows, rowId) =>
          (state.numOfLivingCells += rows.filter(
            (_, colId) => state.cells[rowId][colId]
          ).length)
      );
    },
    SIMULATION_NEXT: (state) => {
      state.cells = state.cells.map((rows, rowId) =>
        rows.map((cols, colId) => {
          const count = countNeighbourCells(
            NEIGHBOUR_CELL_COORDINATES,
            GRID_SIZE,
            state.cells,
            rowId,
            colId
          );

          if (state.cells[rowId][colId] && (count < 2 || count > 3)) {
            return false;
          }

          if (!state.cells[rowId][colId] && count === 3) {
            return true;
          }

          return cols;
        })
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
  SIMULATION_NEXT,
  SET_CELL_VALUE,
  INCREASE_GENERATION_NUM,
} = simulationSlice.actions;

export const selectSimulationStatus = (state: RootState) =>
  state.simulation.isSimulationRunning;
export const selectCells = (state: RootState) => state.simulation.cells;
export const selectNumOfLivingCells = (state: RootState) =>
  state.simulation.numOfLivingCells;
export const selectNumOfGenerations = (state: RootState) =>
  state.simulation.numOfGenerations;

export default simulationSlice.reducer;