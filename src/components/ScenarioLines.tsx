import React, { useEffect } from 'react'
import { Layer, Line } from 'react-konva'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, canvas } from 'ducks'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'

interface IScenarioLines {
  scenario: IScenario | null
  canvas: ICanvasDimensions | null
  setCanvas: (payload: number) => void
}

const ScenarioLinesComponent: React.FC<IScenarioLines> = props => {
  const { canvas, setCanvas } = props

  useEffect(() => {
    setCanvas(window.innerWidth)
  }, [setCanvas])

  if (!canvas) return <></>

  return (
    <>
      <Layer>
        {/*   If you have three points with x and y coordinates 
                you should define points property 
                as: [x1, y1, x2, y2, x3, y3]. 
                */}
        {/* This layer will be the midline */}
        <Line points={[10, canvas.canvasY / 2, canvas.canvasX - 10, canvas.canvasY / 2]} stroke="black" />
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const ScenarioLines = connect(mapStateToProps, { setCanvas: canvas.actions.setCanvas })(
  ScenarioLinesComponent
)

export default ScenarioLines
