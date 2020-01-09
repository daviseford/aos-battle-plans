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

/**
 * Update a single base , based on baseId matching
 * @param state
 * @param action
 */
const updateBase = (state: IBaseGroupStore, action: { payload: IBase }) => {
  let baseIndex = -1
  const groupIndex = state.baseGroups.findIndex(group => {
    const _baseIds = group.bases.map(base => base.id)
    const baseIdx = _baseIds.indexOf(action.payload.id)
    if (baseIdx > -1) {
      baseIndex = baseIdx
    }
    return baseIdx > -1
  })
  state.baseGroups[groupIndex][baseIndex] = action.payload
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
