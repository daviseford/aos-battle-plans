import { createSlice } from '@reduxjs/toolkit'
import { ICanvasStore } from 'types/store'

const initialState: ICanvasStore = {
  canvas: null,
}

const setCanvas = (state: ICanvasStore, action: { payload: number }) => {
  const [tableWidth, tableHeight] = [72, 48]
  const canvasWidth = action.payload // window.innerWidth
  const canvasHeight = canvasWidth * (tableHeight / tableWidth)

  state.canvas = {
    tableWidth,
    tableHeight,
    canvasWidth,
    canvasHeight,
  }
}

export const canvas = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas,
  },
})
