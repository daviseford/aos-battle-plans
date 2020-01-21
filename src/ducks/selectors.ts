import { IStore } from 'types/store'

// Auras
export const getAuras = (state: IStore) => state.auras.auras

// Base Groups
export const getBaseGroups = (state: IStore) => state.baseGroups.baseGroups

// Canvas
export const getCanvas = (state: IStore) => state.canvas.canvas

// Canvas Selections
export const getSelectedAura = (state: IStore) => {
  const id = state.canvas.selectedAuraId
  if (!id) return null
  return state.auras.auras.find(x => x.id === id) || null
}
export const getSelectedAuraId = (state: IStore) => state.canvas.selectedAuraId
export const getSelectedBaseGroup = (state: IStore) => {
  const id = state.canvas.selectedBaseGroupId
  if (!id) return null
  return state.baseGroups.baseGroups.find(x => x.id === id) || null
}
export const getSelectedBaseGroupId = (state: IStore) => state.canvas.selectedBaseGroupId
export const getSelectedCircleBaseId = (state: IStore) => state.canvas.selectedCircleBaseId
export const getSelectedOvalBaseId = (state: IStore) => state.canvas.selectedOvalBaseId
export const getSelectedRulerId = (state: IStore) => state.canvas.selectedRulerId

// Rulers
export const getRulers = (state: IStore) => state.rulers.rulers

// Scenario
export const getScenario = (state: IStore) => state.scenario.scenario
