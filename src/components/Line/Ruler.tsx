import React from 'react'
import { Line, Text, Group } from 'react-konva'
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
  let [xOffset, yOffset] = [0, 0]

  if (scenario.orientation === 'vertical') {
    points = [x, y, x + rulerLengthInches / canvas.conversionPercentX, y]
    yOffset = -4
  } else {
    xOffset = -5
  }

  const pos = {
    x: (points[0] + points[2]) / 2 + xOffset,
    y: (points[1] + points[3]) / 2 + yOffset,
  }

  if (!canvas) return <></>

  return (
    <Group draggable>
      <Line points={points} stroke={'black'} strokeWidth={15} fill={'black'} />
      <Text text={`${rulerLengthInches}"`} x={pos.x} y={pos.y} fill={'white'} />
    </Group>
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
