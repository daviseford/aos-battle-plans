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

interface ITopToolbar {
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
  baseSizeString: '',
  groupId: '',
}

const UnitSelectMenuComponent: React.FC<ITopToolbar> = props => {
  const { canvas, addBaseGroup, baseGroups, deleteBaseGroup, updateBaseGroup } = props

  const [state, setState] = useState(initialState)

  if (!canvas) return <></>

  const options = baseSizesToOptions()

  const handleNumBaseChange = e => {
    e.preventDefault()

    const numBases = e.target.value
    const difference = numBases - state.numBases // so 7 - 10 = -3   10 - 0 = 0

    setState(c => ({ ...c, numBases }))

    if (!state.groupId) return
    if (numBases === 0) return deleteBaseGroup(state.groupId)

    const group = baseGroups.find(x => x.id === state.groupId) as IBaseGroup
    let bases: IBase[] = []

    if (difference > 0) {
      bases = group.bases.concat(createBases(numBases))
    }

    updateBaseGroup({ ...group, bases })
  }

  const handleBaseSelection = value => {
    const bases = createBases(state.numBases)

    const groupId = shortid.generate()
    const baseGroup: IBaseGroup = {
      id: groupId,
      baseSizeMM: CircleBaseSizes[value.label],
      baseSizeString: value.label,
      bases,
    }
    addBaseGroup(baseGroup)
    setState(s => ({ ...s, groupId }))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <input
          className="form-control"
          type="number"
          onChange={handleNumBaseChange}
          placeholder="Number of models"
        />
      </div>
      <div className="col-6">
        <Select onChange={handleBaseSelection} options={options} placeholder={'Base size'} />
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
