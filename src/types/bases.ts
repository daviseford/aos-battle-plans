export interface IBase {
  id: string
  x: number
  y: number
  draggable: boolean
}

export interface IBaseGroup {
  baseSizeMM: [number, number] // e.g. [32, 32] or  [120, 70]
  bases: IBase[]
  id: string
  label?: string
}
