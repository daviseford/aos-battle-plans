import { createSlice } from '@reduxjs/toolkit'
import { IBaseGroup, IBase } from 'types/bases'
import { IBaseGroupStore } from 'types/store'

const initialState: IBaseGroupStore = {
  baseGroups: [],
}

/**
 * Pass in a group ID, (optional) label, and any bases already added to the group
 * @param state
 * @param action
 */
const addBaseGroup = (state: IBaseGroupStore, action: { payload: IBaseGroup }) => {
  state.baseGroups.push(action.payload)
}

/**
 * Update a single base group, based on groupId matching
 * @param state
 * @param action
 */
const updateBaseGroup = (state: IBaseGroupStore, action: { payload: IBaseGroup }) => {
  const i = state.baseGroups.findIndex(x => x.id === action.payload.id)
  state.baseGroups[i] = action.payload
}

export interface IUpdateBasePayload {
  base: IBase
  groupId: string
}

/**
 * Update a single base, based on baseId matching
 * @param state
 * @param action
 */
const updateBase = (state: IBaseGroupStore, action: { payload: IUpdateBasePayload }) => {
  const groupIndex = state.baseGroups.findIndex(group => group.id === action.payload.groupId)
  const baseIdx = state.baseGroups[groupIndex].bases.findIndex(base => base.id === action.payload.base.id)
  state.baseGroups[groupIndex].bases[baseIdx] = action.payload.base
}

/**
 * Delete a base from a given baseGroup by id
 */
const deleteBaseFromGroup = (
  state: IBaseGroupStore,
  action: { payload: { groupId: string; baseId: string } }
) => {
  state.baseGroups.map(group => {
    if (group.id === action.payload.groupId) {
      return group.bases.filter(b => b.id !== action.payload.baseId)
    }
    return group
  })
}

/**
 * Delete a baseGroup by id
 */
const deleteBaseGroup = (state: IBaseGroupStore, action: { payload: string }) => {
  state.baseGroups = state.baseGroups.filter(group => group.id !== action.payload)
}

export const baseGroups = createSlice({
  name: 'baseGroups',
  initialState,

  reducers: {
    addBaseGroup,
    clearBaseGroups: state => (state = initialState),
    deleteBaseGroup,
    deleteBaseFromGroup,
    updateBase,
    updateBaseGroup,
  },
})
