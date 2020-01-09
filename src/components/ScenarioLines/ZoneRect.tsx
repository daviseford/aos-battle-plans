import React from 'react'
import { Rect } from 'react-konva'

interface IZoneProps {
  x: number
  y: number
  width: number
  height: number
}

export const ZoneRect: React.FC<IZoneProps> = props => {
  return <Rect {...props} fill={'#d6d5d0'} />
}

export const EnemyZone: React.FC<IZoneProps> = props => {
  return <Rect {...props} fill={'#FFD9D9'} opacity={1} />
}
