import { IBaseGroup } from './bases'
import { ICanvasDimensions } from './canvas'
import { IScenario } from './scenario'
import { IRuler } from './rulers'
import { IAura } from './auras'

export interface IAurasStore {
  auras: IAura[]
}
export interface IBaseGroupStore {
  baseGroups: IBaseGroup[]
}
export interface ICanvasStore {
  canvas: ICanvasDimensions | null
  selectedOvalBaseId: string | null
  selectedAuraId: string | null
  selectedRulerId: string | null
}
export interface IRulerStore {
  rulers: IRuler[]
}
export interface IScenarioStore {
  scenario: IScenario
}

export interface IStore {
  auras: IAurasStore
  baseGroups: IBaseGroupStore
  canvas: ICanvasStore
  rulers: IRulerStore
  scenario: IScenarioStore
}
