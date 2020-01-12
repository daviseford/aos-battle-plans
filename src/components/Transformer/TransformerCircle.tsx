import React from 'react'
import { Layer, Text, Transformer, Circle, Group } from 'react-konva'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'

interface ICircleComponent {
  shapeProps: any
  isSelected: any
  onSelect: any
  onChange: any
  canvas: ICanvasDimensions
}

const CircleComponent: React.FC<ICircleComponent> = props => {
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
    <React.Fragment>
      <Group draggable={true}>
        <Circle
          onClick={onSelect}
          ref={shapeRef}
          {...shapeProps}
          onDragEnd={e => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            })
          }}
          onTransformEnd={e => {
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
        />

        <Text
          text={`${(canvas.conversionPercentX * shapeProps.width).toFixed(2)}"`}
          stroke={`black`}
          fill={`white`}
          align={'center'}
          fontSize={16}
          x={shapeProps.x - 5}
          y={shapeProps.y}
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
    </React.Fragment>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const ConnectedCircle = connect(mapStateToProps, null)(CircleComponent)

const initialRectangles = [
  // {
  //   x: 10,
  //   y: 10,
  //   width: 100,
  //   height: 100,
  //   fill: 'red',
  //   id: 'rect1',
  // },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
]

const TransformerCircle = () => {
  const [circles, setCircles] = React.useState(initialRectangles)
  const [selectedId, selectShape] = React.useState(null)

  return (
    <Layer>
      {circles.map((c, i) => {
        return (
          <ConnectedCircle
            key={i}
            shapeProps={c}
            isSelected={c.id === selectedId}
            onSelect={() => {
              // @ts-ignore
              selectShape(c.id)
            }}
            onChange={newAttrs => {
              const circs = circles.slice()
              circs[i] = newAttrs
              setCircles(circs)
            }}
          />
        )
      })}
    </Layer>
  )
}

export default TransformerCircle
