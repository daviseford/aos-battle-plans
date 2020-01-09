import React from 'react'
import { Rect } from 'react-konva'

interface IEnemyAreaProps {
  x: number
  y: number
  width: number
  height: number
}

const ZoneRect: React.FC<IEnemyAreaProps> = props => {
  return <Rect {...props} fill={'#FFD9D9'} opacity={1} />
}

export default ZoneRect
