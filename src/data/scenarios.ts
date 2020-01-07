import {
  TABLE_HEIGHT_FULL,
  TABLE_WIDTH_FULL,
  TABLE_WIDTH_HALF,
  TABLE_HEIGHT_HALF,
  TABLE_WIDTH_QUARTER,
  TABLE_HEIGHT_QUARTER,
} from './table'

export interface ISetupRestrictions {
  fromDividerInches: number
  fromSideInches: number
  fromPlayerInches: number
}

export interface IObjective {
  x: number
  y: number
  label?: string
}

export interface IScenario {
  name: string
  matchedPlay: boolean
  orientation: 'horizontal' | 'vertical' | 'diagonalTopLeft' | 'diagonalTopRight'
  setupRestrictions: ISetupRestrictions
  // Measured in inches, [x, y]
  objectives: IObjective[]
}

const Scenarios: IScenario[] = [
  {
    name: `Battle For The Pass`,
    matchedPlay: true,
    orientation: `vertical`,
    setupRestrictions: {
      fromDividerInches: 12,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF + TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
    ],
  },
  {
    name: `Total Commitment`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
    ],
  },
  {
    name: `Scorched Earth`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
    ],
  },
]

export default Scenarios
