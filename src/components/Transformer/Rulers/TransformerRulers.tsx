import React from 'react'
import { Layer, Rect, Transformer, Group, Text } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, rulers } from 'ducks'
import { IRuler } from 'types/rulers'
import { sortBy } from 'lodash'

interface IRect {
  shapeProps: any
  isSelected: any
  onSelect: any
  updateRuler: (id: string) => void
  canvas: ICanvasDimensions
}

const getDistance = (inches: number) => {
  const flooredW = Math.floor(inches)

  return {
    fromBottom: {
      from: inches - flooredW,
      value: flooredW,
    },
    fromQuarter: {
      from: Math.abs(inches - (flooredW + 0.25)),
      value: flooredW + 0.25,
    },
    fromHalf: {
      from: Math.abs(inches - (flooredW + 0.5)),
      value: flooredW + 0.5,
    },
    fromThreeQuarter: {
      from: Math.abs(inches - (flooredW + 0.75)),
      value: flooredW + 0.75,
    },
    fromTop: {
      from: Math.abs(inches - (flooredW + 1)),
      value: flooredW + 1,
    },
  }
}

const SingleRect: React.FC<IRect> = props => {
  const { shapeProps, isSelected, onSelect, canvas } = props
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

  const inchesWidth = (canvas.conversionPercentX * shapeProps.width).toFixed(2)
  const inchesHeight = (canvas.conversionPercentY * shapeProps.height).toFixed(2)

  return (
    <Group draggable={true}>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        fill={'black'}
        stroke={'black'}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          props.updateRuler({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current
          // @ts-ignore
          const scaleX = node.scaleX()
          // @ts-ignore
          const scaleY = node.scaleY()

          // @ts-ignore
          node.scaleX(1)
          // @ts-ignore
          node.scaleY(1)

          // @ts-ignore
          const rulerWidthInches = node.width() * canvas.conversionPercentX
          const distanceW = getDistance(rulerWidthInches)
          const snapWidthTo = sortBy(Object.keys(distanceW), key => distanceW[key].from)[0]
          const newWidth = distanceW[snapWidthTo].value / canvas.conversionPercentX

          props.updateRuler({
            ...shapeProps,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            // @ts-ignore
            width: newWidth, // set minimal value
            // @ts-ignore
            height: Math.max(node.height() * scaleY),
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
            ...shapeProps,
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
        x={shapeProps.x + shapeProps.width / 6}
        y={shapeProps.y + shapeProps.height + 2}
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

const ConnectedRect = connect(mapStateToProps, { updateRuler: rulers.actions.updateRuler })(SingleRect)

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
              shapeProps={ruler}
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
