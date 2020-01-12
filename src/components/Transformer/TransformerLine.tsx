import React from 'react'
import { Layer, Text, Transformer, Line, Group } from 'react-konva'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IScenario } from 'types/scenario'

interface ICircleComponent {
  canvas: ICanvasDimensions
  isSelected: any
  onChange: any
  onSelect: any
  rulerLengthInches: number
  scenario: IScenario
  shapeProps: any
}

interface IPoints {
  points: number[]
  pos: { x: number; y: number }
}

const getPoints = (x: number, y: number, canvas: ICanvasDimensions, scenario: IScenario): IPoints => {
  let points = [x, y, x, y + 3 / canvas.conversionPercentY]
  let [xOffset, yOffset] = [0, 0]

  if (scenario.orientation === 'vertical') {
    points = [x, y, x + 3 / canvas.conversionPercentX, y]
  }

  const pos = {
    x: (points[0] + points[2]) / 2 + xOffset,
    y: (points[1] + points[3]) / 2 + yOffset,
  }

  return { points, pos }
}

const LineComponent: React.FC<ICircleComponent> = props => {
  const { shapeProps, isSelected, onSelect, onChange, canvas, scenario } = props

  const { points, pos } = getPoints(shapeProps.x, shapeProps.y, canvas, scenario)

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
        <Line
          onClick={onSelect}
          ref={shapeRef}
          {...shapeProps}
          strokeWidth={15}
          points={points}
          onTransformEnd={e => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current

            if (!node) return
            // @ts-ignore
            const scaleX = node.scaleX()
            // @ts-ignore
            const scaleY = node.scaleY()

            // we will reset it back
            // @ts-ignore
            node.scaleX(1)
            // @ts-ignore
            node.scaleY(1)

            // @ts-ignore
            console.log(node.x(), node.y())

            const newPoints = [
              // @ts-ignore
              points[0] - node.x(),
              // @ts-ignore
              points[1] + node.y(),
              // @ts-ignore
              points[2] + node.x(),
              // @ts-ignore
              points[3] + node.y(),
            ]

            // @ts-ignore
            // const { points, pos } = getPoints(node.x(), node.y(), canvas, scenario)

            console.log(newPoints)

            onChange({
              ...shapeProps,
              // @ts-ignore
              // x: node.x(),
              // @ts-ignore
              // y: node.y(),
              points: newPoints,
              // @ts-ignore
              // width: Math.max(5, node.width() * scaleX), // set minimal value
              // // @ts-ignore
              // height: Math.max(node.height() * scaleY),
            })
          }}
        />

        <Text
          text={`${(canvas.conversionPercentX * shapeProps.width).toFixed(2)}"`}
          stroke={`black`}
          fill={`white`}
          align={'center'}
          fontSize={16}
          x={pos.x}
          y={pos.y}
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
  scenario: selectors.getScenario(state),
})

const ConnectedLine = connect(mapStateToProps, null)(LineComponent)

const initialLines = [
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
    fill: 'green',
    stroke: 'green',
    id: 'rect2',
  },
]

const TransformerLine = () => {
  const [circles, setCircles] = React.useState(initialLines)
  const [selectedId, selectShape] = React.useState(null)

  return (
    <Layer>
      {circles.map((c, i) => {
        return (
          <ConnectedLine
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

export default TransformerLine
