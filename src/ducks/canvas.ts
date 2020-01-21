import { createSlice } from '@reduxjs/toolkit'
import { ICanvasStore } from 'types/store'
import { TABLE_HEIGHT_FULL, TABLE_WIDTH_FULL } from 'data/table'

const initialState: ICanvasStore = {
  canvas: null,
  // Metadata about the state of canvas selections
  selectedAuraId: null,
  selectedCircleBaseId: null,
  selectedBaseGroupId: null,
  selectedOvalBaseId: null,
  selectedRulerId: null,
}

const setSelectedBaseGroupId = (state: ICanvasStore, action: { payload: string | null }) => {
  state.selectedAuraId = null
  state.selectedBaseGroupId = action.payload
  state.selectedCircleBaseId = null
  state.selectedOvalBaseId = null
  state.selectedRulerId = null
}

const setSelectedCircleBaseId = (state: ICanvasStore, action: { payload: string | null }) => {
  state.selectedAuraId = null
  // state.selectedBaseGroupId = null
  state.selectedCircleBaseId = action.payload
  state.selectedOvalBaseId = null
  state.selectedRulerId = null
}

const setSelectedAuraId = (state: ICanvasStore, action: { payload: string | null }) => {
  state.selectedAuraId = action.payload
  state.selectedBaseGroupId = null
  state.selectedCircleBaseId = null
  state.selectedOvalBaseId = null
  state.selectedRulerId = null
}
const setSelectedOvalBaseId = (state: ICanvasStore, action: { payload: string | null }) => {
  state.selectedAuraId = null
  // state.selectedBaseGroupId = null
  state.selectedCircleBaseId = null
  state.selectedOvalBaseId = action.payload
  state.selectedRulerId = null
}
const setSelectedRulerId = (state: ICanvasStore, action: { payload: string | null }) => {
  state.selectedAuraId = null
  state.selectedBaseGroupId = null
  state.selectedCircleBaseId = null
  state.selectedOvalBaseId = null
  state.selectedRulerId = action.payload
}

const setCanvas = (state: ICanvasStore, action: { payload: number }) => {
  const canvasWidth = action.payload // window.innerWidth
  const canvasHeight = canvasWidth * (TABLE_HEIGHT_FULL / TABLE_WIDTH_FULL)
  const conversionPercentX = TABLE_WIDTH_FULL / canvasWidth
  const conversionPercentY = TABLE_HEIGHT_FULL / canvasHeight

  state.canvas = {
    canvasWidth,
    canvasHeight,
    conversionPercentX,
    conversionPercentY,
  }
}

export const canvas = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas,
    setSelectedAuraId,
    setSelectedBaseGroupId,
    setSelectedCircleBaseId,
    setSelectedOvalBaseId,
    setSelectedRulerId,
  },
})
