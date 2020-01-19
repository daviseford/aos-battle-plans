import React, { useCallback, useEffect } from 'react'
import { Circle } from 'react-konva'
import { DEFAULT_DRAGGABLE_COLOR } from 'theme/colors'
import { connect } from 'react-redux'
import { baseGroups, IUpdateBasePayload, canvas, selectors } from 'ducks'
import { IBaseGroup, IBase } from 'types/bases'
import { dragScaleUp, dragEndBounce } from 'utils/handleDrag'
import { IStore } from 'types/store'

interface ICircleBase {
  base: IBase
  radius: number
  baseGroup: IBaseGroup
  selectedBaseId: string | null
  updateBase: (payload: IUpdateBasePayload) => void
  setSelectedCircleBaseId: (id: string | null) => void
}

const CircleBaseComponent: React.FC<ICircleBase> = props => {
  const { base, radius, baseGroup, updateBase, setSelectedCircleBaseId, selectedBaseId } = props

  const isSelected = selectedBaseId === base.id

  useEffect(() => {
    // Only run on mount
    updateBase({ base, groupId: baseGroup.id })
    // eslint-disable-next-line
  }, [])

  const handleClick = useCallback(
    e => {
      const payload = {
        base: {
          ...base,
          draggable: !base.draggable,
        },
        groupId: baseGroup.id,
      }
      updateBase(payload)
      setSelectedCircleBaseId(payload.base.draggable ? base.id : null)
    },
    [base, baseGroup.id, updateBase, setSelectedCircleBaseId]
  )

  const handleDragStart = e => dragScaleUp(e)

  const handleDragEnd = useCallback(
    e => {
      dragEndBounce(e)

      const payload = {
        base: {
          ...base,
          x: e.target.x(),
          y: e.target.y(),
        },
        groupId: baseGroup.id,
      }
      updateBase(payload)
    },
    [base, baseGroup.id, updateBase]
  )

  const handleTap = e => {
    return setSelectedCircleBaseId(isSelected ? null : base.id)
  }

  return (
    <Circle
      draggable={base.draggable}
      fill={base.draggable ? DEFAULT_DRAGGABLE_COLOR : baseGroup.color}
      onTap={handleTap}
      onClick={handleClick}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      perfectDrawEnabled={false}
      radius={radius}
      shadowBlur={5}
      x={base.x}
      y={base.y}
    />
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  selectedBaseId: selectors.getSelectedCircleBaseId(state),
})

const CircleBase = connect(mapStateToProps, {
  updateBase: baseGroups.actions.updateBase,
  setSelectedCircleBaseId: canvas.actions.setSelectedCircleBaseId,
})(CircleBaseComponent)

export default CircleBase
