import { ICanvasDimensions } from 'types/canvas'
import { IObjective, IScenario } from 'types/scenario'

export interface ILineInfo {
  divider: number
  sideOffset: number
  dividerOffset: number
  playerOffset: number
  canvasWidth: number
  canvasHeight: number
  objectives: IObjective[]
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
    objectives: convertObjectives(canvas, scenario),
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
    objectives: convertObjectives(canvas, scenario),
  }
}

export interface IDiagonalLineInfo {
  divider: {
    startX: number
    startY: number
    endX: number
    endY: number
  }
  sideOffsetX: number
  sideOffsetY: number
  dividerOffsetX: number
  dividerOffsetY: number
  canvasWidth: number
  canvasHeight: number
  objectives: IObjective[]
}

export const getDiagonalInfo = (canvas: ICanvasDimensions, scenario: IScenario): IDiagonalLineInfo => {
  let divider = {} as IDiagonalLineInfo['divider']
  if (scenario.orientation === 'diagonalTopRight') {
    divider = {
      startX: 0,
      startY: canvas.canvasHeight,
      endX: canvas.canvasWidth,
      endY: 0,
    }
  } else {
    divider = {
      startX: 0,
      startY: 0,
      endX: canvas.canvasWidth,
      endY: canvas.canvasHeight,
    }
  }

  const { setupRestrictions } = scenario
  const { fromSideInches = 0, fromDividerInches = 0 } = setupRestrictions

  const sideOffsetY = fromSideInches ? fromSideInches / canvas.conversionPercentY : 0
  const sideOffsetX = fromSideInches ? fromSideInches / canvas.conversionPercentX : 0
  const dividerOffsetX = fromDividerInches ? fromDividerInches / canvas.conversionPercentX : 0
  const dividerOffsetY = fromDividerInches ? fromDividerInches / canvas.conversionPercentY : 0

  return {
    canvasHeight: canvas.canvasHeight,
    canvasWidth: canvas.canvasWidth,
    divider,
    dividerOffsetX,
    dividerOffsetY,
    objectives: convertObjectives(canvas, scenario),
    sideOffsetX,
    sideOffsetY,
  }
}

const convertObjectives = (canvas: ICanvasDimensions, scenario: IScenario): IObjective[] => {
  return scenario.objectives.map(o => ({
    x: o.x / canvas.conversionPercentX,
    y: o.y / canvas.conversionPercentY,
    label: o.label || undefined,
  }))
}
