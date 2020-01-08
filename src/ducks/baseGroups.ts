import { createSlice } from '@reduxjs/toolkit'
import { IBaseGroup } from 'types/bases'
import { IBaseGroupStore } from 'types/store'

const initialState: IBaseGroupStore = {
  baseGroups: [],
}

/**
 * Pass in a group ID, (optional) label, and any bases already added to the group
 * @param state
 * @param action
 */
const addBaseGroup = (state, action: { payload: IBaseGroup }) => {
  state.baseGroups.push(action.payload)
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
  state.baseGroups.filter(group => group.id !== action.payload)
}

export const baseGroups = createSlice({
  name: 'baseGroups',
  initialState,

  reducers: {
    addBaseGroup,
    clearBaseGroups: state => (state = initialState),
    deleteBaseGroup,
    deleteBaseFromGroup,
  },
})
