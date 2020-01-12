import { IStore } from 'types/store'

// Base Groups
export const getBaseGroups = (state: IStore) => state.baseGroups.baseGroups

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Rulers
export const getRulers = (state: IStore) => state.rulers.rulers

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
