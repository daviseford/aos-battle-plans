import { ICanvasDimensions } from 'types/canvas'
import { IScenario } from 'data/scenarios'

export interface ILineInfo {
  dividerY: number
  sideOffsetX: number
  dividerOffsetY: number
  topOffsetY: number
  canvasWidth: number
  canvasHeight: number
}

export const getLineInfo = (canvas: ICanvasDimensions, scenario: IScenario): ILineInfo => {
  const dividerY = canvas.canvasHeight / 2

  const { setupRestrictions } = scenario
  const { fromSideInches = 0, fromDividerInches = 0, fromTopInches = 0 } = setupRestrictions

  const sideOffsetX = fromSideInches ? fromSideInches / canvas.conversionPercentX : 0
  const dividerOffsetY = fromDividerInches ? fromDividerInches / canvas.conversionPercentY : 0
  const topOffsetY = fromTopInches ? fromTopInches / canvas.conversionPercentY : 0

  return {
    dividerOffsetY,
    dividerY,
    sideOffsetX,
    topOffsetY,
    canvasWidth: canvas.canvasWidth,
    canvasHeight: canvas.canvasHeight,
  }
}
