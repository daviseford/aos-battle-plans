import React from 'react'
import { connect } from 'react-redux'
import { selectors, scenario } from 'ducks'
import Scenarios from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import Select from 'react-select'
import { IScenario } from 'types/scenario'
import UnitSelectMenu from '../Input/UnitSelectMenu'
import { IBaseGroup } from 'types/bases'
import GroupManager from '../BaseGroup/GroupManager'

interface IBottomToolbar {
  baseGroups: IBaseGroup[]
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

const BottomToolbarComponent: React.FC<IBottomToolbar> = props => {
  const { canvas, scenario, setScenario, baseGroups } = props

  if (!canvas) return <></>

  const options = scenariosToOptions()

  const handleScenarioChange = value => {
    setScenario(value.label)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-info text-center justify-content-center">
          <div className="col-6"></div>
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

const BottomToolbar = connect(mapStateToProps, {})(BottomToolbarComponent)

export default BottomToolbar
