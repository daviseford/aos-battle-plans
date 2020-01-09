export interface IBase {
  id: string
  x: number
  y: number
  draggable: boolean
}

export interface IBaseGroup {
  baseSizeString: string // e.g. '32mm'
  baseSizeMM: [number, number] // e.g. [32, 32] or  [120, 70]
  bases: IBase[]
  id: string
  label: string
}
