import { IStore } from 'types/store'

// Auras
export const getAuras = (state: IStore) => state.auras.auras

// Base Groups
export const getBaseGroups = (state: IStore) => state.baseGroups.baseGroups

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Canvas selections
export const getSelectedAuraId = (state: IStore) => state.canvas.selectedAuraId
export const getSelectedOvalBaseId = (state: IStore) => state.canvas.selectedOvalBaseId
export const getSelectedRulerId = (state: IStore) => state.canvas.selectedRulerId

// Rulers
export const getRulers = (state: IStore) => state.rulers.rulers

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
