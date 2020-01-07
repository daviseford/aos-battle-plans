import React from 'react'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'

interface ITopToolbar {
  canvas: ICanvasDimensions
  scenario: IScenario
}

const TopToolbarComponent: React.FC<ITopToolbar> = props => {
  const { canvas, scenario } = props

  if (!canvas) return <></>

  return (
    <>
      <div className="container bg-info text-white text-center">
        <h2>Scenario: {scenario.name}</h2>
        <span>Canvas Width: {canvas.canvasWidth}</span>
      </div>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const TopToolbar = connect(mapStateToProps, null)(TopToolbarComponent)

export default TopToolbar
