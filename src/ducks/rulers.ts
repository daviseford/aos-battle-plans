import { createSlice } from '@reduxjs/toolkit'
import { IRulerStore } from 'types/store'
import { IRuler } from 'types/rulers'

const initialState: IRulerStore = {
  rulers: [],
  selectedId: null,
}

const addRuler = (state: IRulerStore, action: { payload: IRuler }) => {
  state.rulers.push(action.payload)
}

const updateRuler = (state: IRulerStore, action: { payload: IRuler }) => {
  const idx = state.rulers.findIndex(r => r.id === action.payload.id)
  state.rulers[idx] = action.payload
}

const deleteRuler = (state: IRulerStore, action: { payload: string }) => {
  state.rulers = state.rulers.filter(r => r.id !== action.payload)
}

const setSelectedId = (state: IRulerStore, action: { payload: string | null }) => {
  state.selectedId = action.payload
}

export const rulers = createSlice({
  name: 'rulers',
  initialState,
  reducers: {
    addRuler,
    clearRulers: state => (state = initialState),
    deleteRuler,
    setSelectedId,
    updateRuler,
  },
})
