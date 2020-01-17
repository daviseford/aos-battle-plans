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
import MarkupToolbar from './MarkupToolbar'

interface ITopToolbar {
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

const TopToolbarComponent: React.FC<ITopToolbar> = props => {
  const { canvas, setScenario, baseGroups } = props

  if (!canvas) return <></>

  const options = scenariosToOptions()

  const handleScenarioChange = value => {
    setScenario(value.label)
  }

  return (
    <>
      <div className="container-fluid bg-light pb-2">
        <div className={`d-flex justify-content-start align-items-center`}>
          <div className={`mr-5`}>
            <h4>Scenario:</h4>
          </div>
          <div className={`flex-grow-1`}>
            <Select onChange={handleScenarioChange} options={options} placeholder={Scenarios[0].name} />
          </div>
        </div>

        <div className={`d-flex justify-content-start align-items-center mt-2`}>
          <div className={` mr-5`}>
            <h4>Add Unit:</h4>
          </div>
          <div className={`flex-grow-1`}>
            <UnitSelectMenu />
          </div>
        </div>

        <div className={`row text-center justify-content-center`}>
          {baseGroups.map(group => {
            return (
              <div className="col-4" key={group.id}>
                <GroupManager baseGroup={group} />
              </div>
            )
          })}
        </div>

        <MarkupToolbar />
      </div>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
  baseGroups: selectors.getBaseGroups(state),
})

const TopToolbar = connect(mapStateToProps, { setScenario: scenario.actions.setScenario })(
  TopToolbarComponent
)

export default TopToolbar
