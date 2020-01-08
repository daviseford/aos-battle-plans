import { IBaseGroup } from './bases'
import { ICanvasDimensions } from './canvas'
import { IScenario } from './scenario'

export interface IBaseGroupStore {
  baseGroups: IBaseGroup[]
}
export interface ICanvasStore {
  canvas: ICanvasDimensions | null
}
export interface IScenarioStore {
  scenario: IScenario
}

export interface IStore {
  baseGroups: IBaseGroupStore
  canvas: ICanvasStore
  scenario: IScenarioStore
}
