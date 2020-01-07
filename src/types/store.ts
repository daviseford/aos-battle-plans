import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from './canvas'

export interface IScenarioStore {
  scenario: IScenario | null
}
export interface ICanvasStore {
  canvas: ICanvasDimensions | null
}

export interface IStore {
  scenario: IScenarioStore
  canvas: ICanvasStore
}
