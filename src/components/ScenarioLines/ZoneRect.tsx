import React from 'react'
import { Rect } from 'react-konva'

interface IZoneRectProps {
  x: number
  y: number
  width: number
  height: number
}

const ZoneRect: React.FC<IZoneRectProps> = props => {
  return <Rect {...props} fill={'#d6d5d0'} />
}

export default ZoneRect
