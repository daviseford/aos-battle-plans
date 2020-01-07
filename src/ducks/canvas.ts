import { createSlice } from '@reduxjs/toolkit'
import { ICanvasStore } from 'types/store'
import { TABLE_HEIGHT_FULL, TABLE_WIDTH_FULL } from 'data/table'

const initialState: ICanvasStore = {
  canvas: null,
}

const setCanvas = (state: ICanvasStore, action: { payload: number }) => {
  const canvasWidth = action.payload // window.innerWidth
  const canvasHeight = canvasWidth * (TABLE_HEIGHT_FULL / TABLE_WIDTH_FULL)
  const conversionPercentX = TABLE_WIDTH_FULL / canvasWidth
  const conversionPercentY = TABLE_HEIGHT_FULL / canvasHeight

  state.canvas = {
    canvasWidth,
    canvasHeight,
    conversionPercentX,
    conversionPercentY,
  }
}

export const canvas = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas,
  },
})
