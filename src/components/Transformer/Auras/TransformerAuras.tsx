import React, { useEffect } from 'react'
import { Layer, Rect, Transformer, Group, Text } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, rulers } from 'ducks'
import { IRuler } from 'types/rulers'
import { getSnapDimensions } from 'utils/getSnapDimensions'
import { BACKSPACE_KEYCODE, DELETE_KEYCODE, ENTER_KEYCODE, ESCAPE_KEYCODE } from 'utils/keyCodes'

interface ICirc {
  canvas: ICanvasDimensions
  deleteRuler: (id: string) => void
  setSelectedRuler: (id: string | null) => void
  isSelected: boolean
  onSelect: any
  ruler: IRuler
  updateRuler: (ruler: IRuler) => void
}

const SingleRect: React.FC<ICirc> = props => {
  const { ruler, isSelected, onSelect, canvas, deleteRuler, updateRuler, setSelectedRuler } = props
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  React.useEffect(() => {
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
      if (e.keyCode === BACKSPACE_KEYCODE || e.keyCode === DELETE_KEYCODE) {
        e.preventDefault()
        deleteRuler(ruler.id)
      } else if (e.keyCode === ENTER_KEYCODE || e.keyCode === ESCAPE_KEYCODE) {
        e.preventDefault()
        setSelectedRuler(null)
      }
    }

    if (isSelected && ruler) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelected, deleteRuler, ruler, setSelectedRuler])

  const inchesWidth = (canvas.conversionPercentX * ruler.width).toFixed(2)
  const inchesHeight = (canvas.conversionPercentY * ruler.height).toFixed(2)

  return (
    <Group draggable={true}>
      <Rect
        onClick={onSelect}
        // @ts-ignore
        ref={shapeRef}
        fill={'black'}
        stroke={'black'}
        {...ruler}
        draggable
        onDragEnd={e => {
          updateRuler({
            ...ruler,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current

          // @ts-ignore
          node.scaleX(1)
          // @ts-ignore
          node.scaleY(1)

          // @ts-ignore
          const rulerWidthInches = node.width() * canvas.conversionPercentX
          // @ts-ignore
          const rulerHeightInches = node.height() * canvas.conversionPercentY
          const snapWidth = getSnapDimensions(rulerWidthInches, canvas.conversionPercentX)
          const snapHeight = getSnapDimensions(rulerHeightInches, canvas.conversionPercentY)

          props.updateRuler({
            ...ruler,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            width: snapWidth, // set minimal value
            height: snapHeight,
          })
        }}
        onTransform={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          // @ts-ignore
          const scaleX = node.scaleX()
          // @ts-ignore
          const scaleY = node.scaleY()

          // we will reset it back
          // @ts-ignore
          node.scaleX(1)
          // @ts-ignore
          node.scaleY(1)

          props.updateRuler({
            ...ruler,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            // @ts-ignore
            width: Math.max(5, node.width() * scaleX), // set minimal value
            // @ts-ignore
            height: Math.max(node.height() * scaleY),
          })
        }}
        rotationSnaps={[0, 90, 180, 270]}
      />

      <Text
        text={`${inchesWidth}" x ${inchesHeight}"`}
        stroke={`black`}
        fill={`white`}
        align={'center'}
        fontSize={16}
        x={ruler.x + ruler.width / 6}
        y={ruler.y + ruler.height + 2}
      />

      {isSelected && (
        <Transformer
          // @ts-ignore
          ref={trRef}
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
  canvas: selectors.getCanvas(state),
})

const ConnectedRect = connect(mapStateToProps, {
  deleteRuler: rulers.actions.deleteRuler,
  setSelectedRuler: rulers.actions.setSelectedId,
  updateRuler: rulers.actions.updateRuler,
})(SingleRect)

type TTransformerRect = React.FC<{
  rulers: IRuler[]
  selectedRulerId: string | null
  setSelectedRuler: (id: string | null) => void
}>

const TransformerRulersComponent: TTransformerRect = props => {
  const { rulers, selectedRulerId, setSelectedRuler } = props

  return (
    <Layer>
      {rulers
        .filter(x => x.canTransform)
        .map((ruler, i) => {
          return (
            <ConnectedRect
              key={i}
              ruler={ruler}
              isSelected={ruler.id === selectedRulerId}
              onSelect={() => {
                setSelectedRuler(ruler.id)
              }}
            />
          )
        })}
    </Layer>
  )
}

const mapStateToProps2 = (state: IStore, ownProps) => ({
  ...ownProps,
  rulers: selectors.getRulers(state),
  selectedRulerId: selectors.getSelectedRulerId(state),
})

const TransformerRulers = connect(mapStateToProps2, {
  setSelectedRuler: rulers.actions.setSelectedId,
})(TransformerRulersComponent)

export default TransformerRulers
