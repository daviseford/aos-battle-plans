export interface ISetupRestrictions {
  //   fromEnemyInches: number | null
  fromDividerInches: number | null
  fromBoardEgeInches: number | null
}

export interface IScenario {
  name: string
  matchedPlay: boolean
  orientation: 'horizontal' | 'vertical' | 'diagonalTopLeft' | 'diagonalTopRight'
  setupRestrictions: ISetupRestrictions
}

const Scenarios: IScenario[] = [
  {
    name: `Scorched Earth`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromBoardEgeInches: 12,
    },
  },
]

export default Scenarios
