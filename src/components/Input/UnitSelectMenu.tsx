import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, baseGroups } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import Select from 'react-select'
import { IScenario } from 'types/scenario'
import { CircleBaseSizes } from 'data/bases'
import { IBaseGroup, IBase } from 'types/bases'
import GenericButton from './GenericButton'

interface IUnitSelectMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  baseGroups: IBaseGroup[]
  deleteBaseGroup: (id: string) => void
  addBaseGroup: (group: IBaseGroup) => void
  updateBaseGroup: (group: IBaseGroup) => void
}

const baseSizesToOptions = (): { value: string; label: string }[] => {
  return Object.keys(CircleBaseSizes).map(key => ({
    value: key,
    label: key,
  }))
}

const createBases = (numBases: number) => {
  const bases: IBase[] = [...Array(numBases)].map(x => {
    return {
      id: shortid.generate(),
      x: 0,
      y: 0,
      draggable: true,
    }
  })

  return bases
}

const initialState = {
  numBases: 0,
  baseSizeString: Object.keys(CircleBaseSizes)[0],
}

const UnitSelectMenuComponent: React.FC<IUnitSelectMenu> = props => {
  const { canvas, addBaseGroup } = props

  const [state, setState] = useState(initialState)

  if (!canvas) return <></>

  const options = baseSizesToOptions()

  const handleNumBaseChange = e => {
    e.preventDefault()
    let numBases = parseInt(e.target.value || 0, 10)
    numBases = numBases > 0 ? numBases : 0 // Remove negative numbers
    setState(c => ({ ...c, numBases }))
  }

  const handleBaseSizeChange = value => {
    setState(s => ({ ...s, baseSizeString: value.label }))
  }

  const handleDeployButtonClick = e => {
    e.preventDefault()
    const bases = createBases(state.numBases)

    const baseGroup: IBaseGroup = {
      id: shortid.generate(),
      baseSizeMM: CircleBaseSizes[state.baseSizeString],
      baseSizeString: state.baseSizeString,
      bases,
    }

    addBaseGroup(baseGroup)
  }

  const canClick = state.baseSizeString !== '' && state.numBases > 0

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <input
          className="form-control"
          type="number"
          onChange={handleNumBaseChange}
          placeholder="Number of models"
        />
      </div>
      <div className="col-4">
        <Select
          onChange={handleBaseSizeChange}
          options={options}
          placeholder={'Base size'}
          defaultValue={options[0]}
        />
      </div>
      <div className="col-4">
        <GenericButton onClick={handleDeployButtonClick} hidden={!canClick}>
          Deploy Unit
        </GenericButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  baseGroups: selectors.getBaseGroups(state),
  canvas: selectors.getCanvas(state),
  scenario: selectors.getScenario(state),
})

const UnitSelectMenu = connect(mapStateToProps, {
  addBaseGroup: baseGroups.actions.addBaseGroup,
  deleteBaseGroup: baseGroups.actions.deleteBaseGroup,
  updateBaseGroup: baseGroups.actions.updateBaseGroup,
})(UnitSelectMenuComponent)

export default UnitSelectMenu
