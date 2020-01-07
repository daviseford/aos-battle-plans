import { IStore } from 'types/store'

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
