import { createSlice } from '@reduxjs/toolkit'
import { IAurasStore } from 'types/store'
import { IAura } from 'types/auras'

const initialState: IAurasStore = {
  auras: [],
  selectedId: null,
}

const addAura = (state: IAurasStore, action: { payload: IAura }) => {
  state.auras.push(action.payload)
}

const updateAura = (state: IAurasStore, action: { payload: IAura }) => {
  const idx = state.auras.findIndex(a => a.id === action.payload.id)
  state.auras[idx] = action.payload
}

const deleteAura = (state: IAurasStore, action: { payload: string }) => {
  state.auras = state.auras.filter(a => a.id !== action.payload)
}

const setSelectedId = (state: IAurasStore, action: { payload: string | null }) => {
  state.selectedId = action.payload
}

export const auras = createSlice({
  name: 'auras',
  initialState,
  reducers: {
    addAura,
    clearAuras: state => (state = initialState),
    deleteAura,
    setSelectedId,
    updateAura,
  },
})
