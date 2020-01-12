import React from 'react'
import { Layer, Rect, Transformer, Group, Text } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors } from 'ducks'
import { IRuler } from 'types/rulers'

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

  const inchesWidth = (canvas.conversionPercentX * shapeProps.width).toFixed(2)
  const inchesHeight = (canvas.conversionPercentY * shapeProps.height).toFixed(2)

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

const ConnectedRect = connect(mapStateToProps, null)(TransformerRectComponent)

type TTransformerRect = React.FC<{ rectangles: IRuler[] }>

const TransformerRect: TTransformerRect = props => {
  const [rectangles, setRectangles] = React.useState(props.rectangles)
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
