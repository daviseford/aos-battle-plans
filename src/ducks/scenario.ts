import { createSlice } from '@reduxjs/toolkit'
import { IScenarioStore } from 'types/store'
import Scenarios, { IScenario } from 'data/scenarios'

const initialState: IScenarioStore = {
  scenario: Scenarios[0],
}

export const scenario = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setScenario: (state, action: { payload: IScenario }) => {
      state.scenario = action.payload
    },
  },
})
