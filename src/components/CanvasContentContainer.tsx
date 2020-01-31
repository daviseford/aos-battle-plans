import React from 'react'
import { connect } from 'react-redux'
import { Layer } from 'react-konva'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import HorizontalScenarioLines from 'components/ScenarioLines/Horizontal'
import VerticalScenarioLines from './ScenarioLines/Vertical'
import DiagonalScenarioLines from './ScenarioLines/DiagonalTopRight'
import { IScenario } from 'types/scenario'
import { IBaseGroup } from 'types/bases'
import BaseGroup from './BaseGroup/BaseGroup'
import TransformerRulers from './Transformer/Rulers/TransformerRulers'
import TransformerAuras from './Transformer/Auras/TransformerAuras'

interface ICCC {
  canvas: ICanvasDimensions
  scenario: IScenario
  baseGroups: IBaseGroup[]
}

const CanvasContentContainerComponent: React.FC<ICCC> = props => {
  const { canvas, scenario, baseGroups } = props

  if (!canvas) return <></>

  const ScenarioLines = {
    horizontal: HorizontalScenarioLines,
    vertical: VerticalScenarioLines,
    diagonalTopRight: DiagonalScenarioLines,
    diagonalTopLeft: DiagonalScenarioLines,
  }[scenario.orientation]

  return (
    <>
      {/* Grid lines, boundaries, etc */}
      <ScenarioLines />

      {/* Resizable auras */}
      <TransformerAuras />

      {/* Base display layer */}
      <Layer>
        {baseGroups.map(group => (
          <BaseGroup baseGroup={group} key={group.id} />
        ))}
      </Layer>

      {/* Resizable rulers */}
      <TransformerRulers />
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
