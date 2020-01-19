import React, { useCallback, useEffect, useRef } from 'react'
import { Ellipse, Group, Transformer } from 'react-konva'
import { DEFAULT_DRAGGABLE_COLOR } from 'theme/colors'
import { connect } from 'react-redux'
import { IUpdateBasePayload, selectors, canvas, baseGroups } from 'ducks'
import { IBaseGroup, IBase } from 'types/bases'
import { dragScaleUp, dragEndBounce } from 'utils/handleDrag'
import { IStore } from 'types/store'
import { ENTER_KEYCODE, ESCAPE_KEYCODE } from 'utils/keyCodes'

interface IOvalBaseProps {
  selectedBaseId: string | null
  setSelectedBase: (id: string | null) => void
  base: IBase
  radiusX: number
  radiusY: number
  baseGroup: IBaseGroup
  updateBase: (payload: IUpdateBasePayload) => void
}

const OvalBaseComponent: React.FC<IOvalBaseProps> = props => {
  const { selectedBaseId, setSelectedBase, base, radiusX, radiusY, baseGroup, updateBase } = props
  const isSelected = selectedBaseId === base.id

  useEffect(() => {
    // Only run on mount
    updateBase({ base, groupId: baseGroup.id })
    // eslint-disable-next-line
  }, [])

  const shapeRef = useRef()
  const trRef = useRef()

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // @ts-ignore
      trRef.current.setNode(shapeRef.current)
      // @ts-ignore
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === ENTER_KEYCODE || e.keyCode === ESCAPE_KEYCODE) {
        e.preventDefault()
        setSelectedBase(null)
      }
    }

    if (isSelected) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelected, setSelectedBase])

  const handleClick = useCallback(
    e => {
      const payload = {
        base: {
          ...base,
          draggable: !base.draggable,
        },
        groupId: baseGroup.id,
      }

      setSelectedBase(payload.base.draggable ? base.id : null)
      updateBase(payload)
    },
    [base, baseGroup.id, updateBase, setSelectedBase]
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
    return setSelectedBase(isSelected ? null : base.id)
  }

  return (
    <Group>
      <Ellipse
        // @ts-ignore
        ref={shapeRef}
        draggable={base.draggable}
        fill={base.draggable ? DEFAULT_DRAGGABLE_COLOR : baseGroup.color}
        onClick={handleClick}
        onTap={handleTap}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        perfectDrawEnabled={false}
        radiusX={radiusX}
        radiusY={radiusY}
        shadowBlur={5}
        x={base.x}
        y={base.y}
      />
      {isSelected && (
        <Transformer
          // @ts-ignore
          ref={trRef}
          rotateEnabled={true}
          resizeEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
          keepRatio={false}
        />
      )}
    </Group>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  selectedBaseId: selectors.getSelectedOvalBaseId(state),
})

const OvalBase = connect(mapStateToProps, {
  setSelectedBase: canvas.actions.setSelectedOvalBaseId,
  updateBase: baseGroups.actions.updateBase,
})(OvalBaseComponent)

export default OvalBase
