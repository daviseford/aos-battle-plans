import React, { useState } from 'react'
import { Line, Layer, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors, scenario } from 'ducks'
import { IStore } from 'types/store'
import { ICanvasDimensions } from 'types/canvas'
import { IScenario } from 'types/scenario'

interface IRulerProps {
  x: number
  y: number
  rulerLengthInches: number
  scenario: IScenario
  canvas: ICanvasDimensions
}

const RulerComponent: React.FC<IRulerProps> = props => {
  const { canvas, scenario, rulerLengthInches, x, y } = props

  let points = [x, y, x, y + rulerLengthInches / canvas.conversionPercentY]

  if (scenario.orientation === 'vertical') {
    points = [x, y, x + rulerLengthInches / canvas.conversionPercentX, y]
  }

  const [pos, setPos] = useState({
    x: (points[0] + points[2]) / 2,
    y: (points[1] + points[3]) / 2,
  })

  if (!canvas) return <></>

  const handleDragEnd = e => {
    const x = e.target.attrs.x
    const y = e.target.attrs.y
    setPos(s => ({
      x: s.x + x,
      y: s.y + y,
    }))
  }

  return (
    <Layer>
      <Line points={points} draggable={true} onDragEnd={handleDragEnd} stroke="green" strokeWidth={15} />
      <Text text={`${rulerLengthInches}"`} x={pos.x} y={pos.y} />
    </Layer>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
  baseGroups: selectors.getBaseGroups(state),
})

const Ruler = connect(mapStateToProps, { setScenario: scenario.actions.setScenario })(RulerComponent)

export default Ruler
