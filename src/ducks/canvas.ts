import { createSlice } from '@reduxjs/toolkit'
import { ICanvasStore } from 'types/store'

const initialState: ICanvasStore = {
  canvas: null,
}

const setCanvas = (state: ICanvasStore, action: { payload: number }) => {
  const [tableX, tableY] = [72, 48]
  const canvasX = action.payload // window.innerWidth
  const canvasY = canvasX * (tableY / tableX)

  state.canvas = {
    tableX,
    tableY,
    canvasX,
    canvasY,
  }
}

export const canvas = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas,
  },
})
