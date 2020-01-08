import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectors, scenario, baseGroups } from 'ducks'
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

const

const initialState = {
  numBases: 0,
  groupId: null,
  baseSizeMM: 0,
}

const UnitSelectMenuComponent: React.FC<ITopToolbar> = props => {
  const { canvas, scenario, setScenario } = props

  const [state, setState] = useState(initialState)

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

const UnitSelectMenu = connect(mapStateToProps, { setScenario: baseGroups.actions.addBaseGroup })(
  UnitSelectMenuComponent
)

export default UnitSelectMenu
