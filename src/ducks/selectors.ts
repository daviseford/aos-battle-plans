import { IStore } from 'types/store'

// Auras
export const getAuras = (state: IStore) => state.auras.auras
export const getSelectedAuraId = (state: IStore) => state.auras.selectedId

// Base Groups
export const getBaseGroups = (state: IStore) => state.baseGroups.baseGroups

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Rulers
export const getRulers = (state: IStore) => state.rulers.rulers
export const getSelectedRulerId = (state: IStore) => state.rulers.selectedId

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
