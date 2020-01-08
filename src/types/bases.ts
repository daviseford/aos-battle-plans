export interface IBase {
  id: string
  x: number
  y: number
  draggable: boolean
  sizeMM: [number, number] // e.g. [32, 32] or  [120, 70]
}

export interface IBaseGroup {
  bases: IBase[]
  id: string
  label?: string
}
