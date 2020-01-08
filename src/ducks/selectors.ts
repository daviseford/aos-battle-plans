import { IStore } from 'types/store'

// Base Groups
export const getBaseGroups = (state: IStore) => state.baseGroups.baseGroups

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
