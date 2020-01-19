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
import { DEFAULT_BASE_COLOR } from 'theme/colors'

interface IUnitSelectMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  baseGroups: IBaseGroup[]
  deleteBaseGroup: (id: string) => void
  addBaseGroup: (group: IBaseGroup) => void
  updateBaseGroup: (group: IBaseGroup) => void
}

const MIN_MODELS = 0
const MAX_MODELS = 80

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
      draggable: false,
    }
  })

  return bases
}

const initialState = {
  numBases: MIN_MODELS,
  baseSizeString: Object.keys(CircleBaseSizes)[0],
  label: '',
}

const UnitSelectMenuComponent: React.FC<IUnitSelectMenu> = props => {
  const { canvas, addBaseGroup } = props

  const [state, setState] = useState(initialState)

  if (!canvas) return <></>

  const options = baseSizesToOptions()

  const handleNumBaseChange = e => {
    e.preventDefault()
    let numBases = parseInt(e.target.value || MIN_MODELS, 10)
    numBases = numBases > MIN_MODELS ? numBases : MIN_MODELS // Remove negative numbers
    numBases = numBases > MAX_MODELS ? MAX_MODELS : numBases
    setState(c => ({ ...c, numBases }))
  }

  const handleNameChange = e => {
    e.preventDefault()
    const label = (e?.target?.value || '').trim()
    setState(c => ({ ...c, label }))
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
      label: state.label,
      color: DEFAULT_BASE_COLOR,
    }

    addBaseGroup(baseGroup)
  }

  const canClick = state.baseSizeString !== '' && state.numBases > 0

  return (
    <>
      <div className={`row justify-content-center align-items-center text-center mt-2`}>
        <h5>Add Unit:</h5>
      </div>
      <div className={`row justify-content-start align-items-center  pb-3`}>
        <div className="col-6 col-md-3">
          <input
            className="form-control"
            type="number"
            onChange={handleNumBaseChange}
            placeholder="# Models"
            min={MIN_MODELS}
            max={MAX_MODELS}
          />
        </div>
        <div className="col-6 col-md-3">
          <Select
            onChange={handleBaseSizeChange}
            options={options}
            placeholder={'Base Size'}
            defaultValue={options[0]}
          />
        </div>
        <div className="col-6 col-md-3">
          <input className="form-control" type="text" onChange={handleNameChange} placeholder="Name" />
        </div>
        <div className="col">
          <GenericButton onClick={handleDeployButtonClick} disabled={!canClick}>
            Deploy Unit
          </GenericButton>
        </div>
      </div>
    </>
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
