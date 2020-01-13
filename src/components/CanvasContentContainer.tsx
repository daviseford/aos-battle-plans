import React from 'react'
import { connect } from 'react-redux'
import { Layer } from 'react-konva'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import HorizontalScenarioLines from 'components/ScenarioLines/Horizontal'
import VerticalScenarioLines from './ScenarioLines/Vertical'
import { IScenario } from 'types/scenario'
import { IBaseGroup } from 'types/bases'
import BaseGroup from './BaseGroup/BaseGroup'
import Ruler from './Line/Ruler'
import TransformerRulers from './Transformer/Rulers/TransformerRulers'
import { IRuler } from 'types/rulers'

interface ICCC {
  canvas: ICanvasDimensions
  rulers: IRuler[]
  scenario: IScenario
  baseGroups: IBaseGroup[]
}

const CanvasContentContainerComponent: React.FC<ICCC> = props => {
  const { canvas, scenario, baseGroups, rulers } = props

  if (!canvas) return <></>

  const ScenarioLines =
    scenario.orientation === 'horizontal' ? HorizontalScenarioLines : VerticalScenarioLines

  return (
    <>
      {/* Grid lines, boundaries, etc */}
      <ScenarioLines />

      {/* Drawable Auras */}
      {/* <TransformerCircle /> */}

      {/* Base display layer */}
      <Layer>
        {baseGroups.map(group => (
          <BaseGroup baseGroup={group} key={group.id} />
        ))}
      </Layer>

      {/* Resizable rulers */}
      <TransformerRulers />

      <Layer>
        <Ruler
          rulerLengthInches={9}
          x={canvas.canvasWidth / 2}
          y={canvas.canvasHeight / 2 - 6 / canvas.conversionPercentY}
        />
        <Ruler rulerLengthInches={6} x={canvas.canvasWidth / 2} y={canvas.canvasHeight / 2} />
        <Ruler
          rulerLengthInches={3}
          x={canvas.canvasWidth / 2}
          y={canvas.canvasHeight / 2 + 6 / canvas.conversionPercentY}
        />
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  rulers: selectors.getRulers(state),
  canvas: selectors.getCanvas(state),
  baseGroups: selectors.getBaseGroups(state),
})

const CanvasContentContainer = connect(mapStateToProps, null)(CanvasContentContainerComponent)

export default CanvasContentContainer
