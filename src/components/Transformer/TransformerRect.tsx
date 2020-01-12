import React from 'react'
import { Layer, Rect, Transformer, Group, Text } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors } from 'ducks'

interface ICircleComponent {
  shapeProps: any
  isSelected: any
  onSelect: any
  onChange: any
  canvas: ICanvasDimensions
}

const TransformerRectComponent: React.FC<ICircleComponent> = props => {
  const { shapeProps, isSelected, onSelect, onChange, canvas } = props
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

  return (
    <Group draggable={true}>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
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

          onChange({
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
        text={`${(canvas.conversionPercentX * shapeProps.width).toFixed(2)}"`}
        stroke={`black`}
        fill={`white`}
        align={'center'}
        fontSize={16}
        x={shapeProps.x + shapeProps.width / 2.5}
        y={shapeProps.y + 20}
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
        />
      )}
    </Group>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const ConnectedRect = connect(mapStateToProps, null)(TransformerRectComponent)

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 10,
    fill: 'green',
    id: 'rulerRect',
  },
]

const TransformerRect = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles)
  const [selectedId, selectShape] = React.useState(null)

  return (
    <Layer>
      {rectangles.map((rect, i) => {
        return (
          <ConnectedRect
            key={i}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => {
              // @ts-ignore
              selectShape(rect.id)
            }}
            onChange={newAttrs => {
              const rects = rectangles.slice()
              rects[i] = newAttrs
              setRectangles(rects)
            }}
          />
        )
      })}
    </Layer>
  )
}

export default TransformerRect
