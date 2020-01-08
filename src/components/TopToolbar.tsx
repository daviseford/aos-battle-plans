import React from 'react'
import { connect } from 'react-redux'
import { selectors, scenario } from 'ducks'
import Scenarios from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import Select from 'react-select'
import { IScenario } from 'types/scenario'

interface ITopToolbar {
  canvas: ICanvasDimensions
  scenario: IScenario
  setScenario: (name: string) => void
}

const scenariosToOptions = (): { value: string; label: string }[] => {
  return Scenarios.map(x => ({
    value: x.name,
    label: x.name,
  }))
}

const TopToolbarComponent: React.FC<ITopToolbar> = props => {
  const { canvas, scenario, setScenario } = props

  if (!canvas) return <></>

  const options = scenariosToOptions()

  const handleScenarioChange = value => {
    setScenario(value.label)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-info text-center justify-content-center">
          <div className="col-6">
            <Select onChange={handleScenarioChange} options={options} placeholder={Scenarios[0].name} />
          </div>
          <div className="col-12">
            <h3 className="text-white">Scenario: {scenario.name}</h3>
            <span className="text-white">Canvas Width: {canvas.canvasWidth}</span>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const TopToolbar = connect(mapStateToProps, { setScenario: scenario.actions.setScenario })(
  TopToolbarComponent
)

export default TopToolbar
