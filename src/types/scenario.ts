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
