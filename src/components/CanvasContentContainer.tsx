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

interface ICCC {
  canvas: ICanvasDimensions
  scenario: IScenario
  baseGroups: IBaseGroup[]
}

const CanvasContentContainerComponent: React.FC<ICCC> = props => {
  const { canvas, scenario, baseGroups } = props

  if (!canvas) return <></>

  const ScenarioLines =
    scenario.orientation === 'horizontal' ? HorizontalScenarioLines : VerticalScenarioLines

  return (
    <>
      <ScenarioLines />
      {/* Base display layer */}
      <Layer>
        {baseGroups.map(group => (
          <BaseGroup baseGroup={group} />
        ))}
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
  baseGroups: selectors.getBaseGroups(state),
})

const CanvasContentContainer = connect(mapStateToProps, null)(CanvasContentContainerComponent)

export default CanvasContentContainer
