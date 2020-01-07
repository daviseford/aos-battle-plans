import { ICanvasDimensions } from 'types/canvas'
import { IScenario } from 'data/scenarios'

export interface ILineInfo {
  divider: number
  sideOffset: number
  dividerOffset: number
  playerOffset: number
  canvasWidth: number
  canvasHeight: number
}

export const getLineInfo = (canvas: ICanvasDimensions, scenario: IScenario): ILineInfo => {
  if (scenario.orientation === 'vertical') {
    return getInfoVertical(canvas, scenario)
  }
  return getInfoHorizontal(canvas, scenario)
}

const getInfoVertical = (canvas: ICanvasDimensions, scenario: IScenario): ILineInfo => {
  const divider = canvas.canvasWidth / 2

  const { setupRestrictions } = scenario
  const { fromSideInches = 0, fromDividerInches = 0, fromPlayerInches = 0 } = setupRestrictions

  const sideOffset = fromSideInches ? fromSideInches / canvas.conversionPercentY : 0
  const dividerOffset = fromDividerInches ? fromDividerInches / canvas.conversionPercentX : 0
  const playerOffset = fromPlayerInches ? fromPlayerInches / canvas.conversionPercentX : 0

  return {
    dividerOffset,
    divider,
    sideOffset,
    playerOffset,
    canvasWidth: canvas.canvasWidth,
    canvasHeight: canvas.canvasHeight,
  }
}

const getInfoHorizontal = (canvas: ICanvasDimensions, scenario: IScenario): ILineInfo => {
  const divider = canvas.canvasHeight / 2

  const { setupRestrictions } = scenario
  const { fromSideInches = 0, fromDividerInches = 0, fromPlayerInches: fromTopInches = 0 } = setupRestrictions

  const sideOffset = fromSideInches ? fromSideInches / canvas.conversionPercentX : 0
  const dividerOffset = fromDividerInches ? fromDividerInches / canvas.conversionPercentY : 0
  const playerOffset = fromTopInches ? fromTopInches / canvas.conversionPercentY : 0

  return {
    dividerOffset,
    divider,
    sideOffset,
    playerOffset,
    canvasWidth: canvas.canvasWidth,
    canvasHeight: canvas.canvasHeight,
  }
}
