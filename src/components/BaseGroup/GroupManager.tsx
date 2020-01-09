import React from 'react'
import { connect } from 'react-redux'
import { selectors, baseGroups } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import { IBaseGroup } from 'types/bases'
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

const GroupManagerComponent: React.FC<IGroupManager> = props => {
  const { canvas, deleteBaseGroup } = props

  if (!canvas) return <></>

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteBaseGroup(props.baseGroup.id)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.baseGroup.label}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.baseGroup.bases.length} x {props.baseGroup.baseSizeString}
        </h6>
        <p className="card-text">
          <br />
          <GenericButton onClick={handleDeleteClick} className={genericButtonBlockDanger}>
            Delete
          </GenericButton>
        </p>
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
  deleteBaseGroup: baseGroups.actions.deleteBaseGroup,
  updateBaseGroup: baseGroups.actions.updateBaseGroup,
})(GroupManagerComponent)

export default GroupManager
