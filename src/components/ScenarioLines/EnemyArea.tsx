import React from 'react'
import { Rect } from 'react-konva'
import { ENEMY_AREA_FILL_COLOR } from 'theme/colors'

interface IEnemyAreaProps {
  x: number
  y: number
  width: number
  height: number
}

const EnemyArea: React.FC<IEnemyAreaProps> = props => {
  return <Rect {...props} fill={ENEMY_AREA_FILL_COLOR} opacity={1} />
}

export default EnemyArea
