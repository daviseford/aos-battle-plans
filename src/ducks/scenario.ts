import { createSlice } from '@reduxjs/toolkit'
import { IScenarioStore } from 'types/store'
import Scenarios from 'data/scenarios'
import { IScenario } from 'types/scenario'

const initialState: IScenarioStore = {
  scenario: Scenarios[0],
}

export const scenario = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    /**
     * Pass in the name of the scenario
     */
    setScenario: (state, action: { payload: string }) => {
      state.scenario = Scenarios.find(x => x.name === action.payload) as IScenario
    },
  },
})
