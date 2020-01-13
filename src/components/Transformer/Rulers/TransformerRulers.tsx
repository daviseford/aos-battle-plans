import React, { useEffect } from 'react'
import { Layer, Rect, Transformer, Group, Text } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, rulers } from 'ducks'
import { IRuler } from 'types/rulers'
import { sortBy } from 'lodash'
import { BACKSPACE_KEYCODE, DELETE_KEYCODE, ENTER_KEYCODE, ESCAPE_KEYCODE } from 'utils/keyCodes'

interface IRect {
  ruler: IRuler
  isSelected: any
  onSelect: any
  updateRuler: (ruler: IRuler) => void
  deleteRuler: (id: string) => void
  canvas: ICanvasDimensions
}

/**
 * Given inches like 10.73, will give us the width or height necessary to snap to 10.75"
 * @param inches
 * @param conversionPercent
 */
const getSnapDimensions = (inches: number, conversionPercent: number): number => {
  const flooredVal = Math.floor(inches)

  const lookup = {
    fromBottom: {
      from: inches - flooredVal,
      value: flooredVal,
    },
    fromQuarter: {
      from: Math.abs(inches - (flooredVal + 0.25)),
      value: flooredVal + 0.25,
    },
    fromHalf: {
      from: Math.abs(inches - (flooredVal + 0.5)),
      value: flooredVal + 0.5,
    },
    fromThreeQuarter: {
      from: Math.abs(inches - (flooredVal + 0.75)),
      value: flooredVal + 0.75,
    },
    fromTop: {
      from: Math.abs(inches - (flooredVal + 1)),
      value: flooredVal + 1,
    },
  }

  const snapWidthTo = sortBy(Object.keys(lookup), key => lookup[key].from)[0]
  return lookup[snapWidthTo].value / conversionPercent
}

const SingleRect: React.FC<IRect> = props => {
  const { ruler, isSelected, onSelect, canvas, deleteRuler, updateRuler } = props
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
        console.log('Todo: Unselect me')
      }
    }

    if (isSelected && ruler) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelected, deleteRuler, ruler])

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
  updateRuler: rulers.actions.updateRuler,
})(SingleRect)

type TTransformerRect = React.FC<{ rulers: IRuler[] }>

const TransformerRulersComponent: TTransformerRect = props => {
  const { rulers } = props
  const [selectedId, selectShape] = React.useState(null)

  return (
    <Layer>
      {rulers
        .filter(x => x.canTransform)
        .map((ruler, i) => {
          return (
            <ConnectedRect
              key={i}
              ruler={ruler}
              isSelected={ruler.id === selectedId}
              onSelect={() => {
                // @ts-ignore
                selectShape(ruler.id)
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
})

const TransformerRulers = connect(mapStateToProps2, null)(TransformerRulersComponent)

export default TransformerRulers
