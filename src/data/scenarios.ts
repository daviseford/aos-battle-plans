export interface ISetupRestrictions {
  //   fromEnemyInches: number | null
  fromDividerInches: number | null
  fromBoardEgeInches: number | null
}

export interface IObjective {
  x: number
  y: number
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
    name: `Total Commitment`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromBoardEgeInches: 12,
    },
    objectives: [
      { x: 12, y: 12 },
      { x: 60, y: 12 },
      { x: 12, y: 36 },
      { x: 60, y: 36 },
    ],
  },
  {
    name: `Scorched Earth`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromBoardEgeInches: null,
    },
    objectives: [
      { x: 12, y: 12 },
      { x: 36, y: 12 },
      { x: 60, y: 12 },
      { x: 12, y: 36 },
      { x: 36, y: 36 },
      { x: 60, y: 36 },
    ],
  },
]

export default Scenarios
