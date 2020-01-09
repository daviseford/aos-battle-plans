import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, baseGroups } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import { IBaseGroup, IBase } from 'types/bases'
import GenericButton from '../Input/GenericButton'
import { genericButtonBlockDanger } from 'theme/helperClasses'

interface IGroupManager {
  baseGroup: IBaseGroup
  canvas: ICanvasDimensions
  scenario: IScenario
  baseGroups: IBaseGroup[]
  deleteBaseGroup: (id: string) => void
  updateBaseGroup: (group: IBaseGroup) => void
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

const GroupManagerComponent: React.FC<IGroupManager> = props => {
  const { canvas, updateBaseGroup, deleteBaseGroup } = props

  if (!canvas) return <></>

  const handleNumBaseChange = e => {
    e.preventDefault()
    const numBases = parseInt(e.target.value || 0, 10)
  }

  // const handleDeployButtonClick = e => {
  //   e.preventDefault()
  //   const bases = createBases(state.numBases)

  //   const baseGroup: IBaseGroup = {
  //     id: shortid.generate(),
  //     baseSizeMM: CircleBaseSizes[state.baseSizeString],
  //     baseSizeString: state.baseSizeString,
  //     bases,
  //   }

  //   addBaseGroup(baseGroup)
  // }

  const handleDeleteClick = e => {
    e.preventDefault()

    deleteBaseGroup(props.baseGroup.id)
    debugger
  }

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <input
          className="form-control"
          type="number"
          onChange={handleNumBaseChange}
          placeholder="Number of models"
          defaultValue={props.baseGroup.bases.length}
        />
      </div>
      <div className="col-4">
        <span>{props.baseGroup.baseSizeString}</span>
      </div>
      <div className="col-4">
        <GenericButton onClick={handleDeleteClick} className={genericButtonBlockDanger}>
          Delete
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

const GroupManager = connect(mapStateToProps, {
  addBaseGroup: baseGroups.actions.addBaseGroup,
  deleteBaseGroup: baseGroups.actions.deleteBaseGroup,
  updateBaseGroup: baseGroups.actions.updateBaseGroup,
})(GroupManagerComponent)

export default GroupManager
