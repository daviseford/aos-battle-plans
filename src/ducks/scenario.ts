import { createSlice } from '@reduxjs/toolkit'
import { IScenarioStore } from 'types/store'
import { IScenario } from 'data/scenarios'

const initialState: IScenarioStore = {
  scenario: null,
}

export const scenario = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setScenario: (state, action: { payload: IScenario | null }) => {
      state.scenario = action.payload
    },
  },
})
