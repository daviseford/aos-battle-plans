import React from 'react'
import { connect } from 'react-redux'
import { selectors, baseGroups, canvas } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IBaseGroup } from 'types/bases'
import GenericButton from '../Input/GenericButton'
import { FaTimes, FaCog } from 'react-icons/fa'
import { IStore } from 'types/store'

interface IGroupManagerCollapsed {
  baseGroup: IBaseGroup
  baseGroups: IBaseGroup[]
  canvas: ICanvasDimensions
  deleteBaseGroup: (id: string) => void
  selectedBaseGroupId: string | null
  setSelectedBaseGroupId: (id: string | null) => void
  updateBaseGroup: (group: IBaseGroup) => void
}

const GroupManagerCollapsedComponent: React.FC<IGroupManagerCollapsed> = props => {
  const { canvas, deleteBaseGroup, baseGroup, selectedBaseGroupId, setSelectedBaseGroupId } = props

  if (!canvas || selectedBaseGroupId === baseGroup.id) return <></>

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteBaseGroup(baseGroup.id)
  }

  const handleClickSettings = e => {
    e.preventDefault()
    setSelectedBaseGroupId(baseGroup.id)
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h3>
              <span className="badge" style={{ backgroundColor: baseGroup.color, color: '#fff' }}>
                {baseGroup.label || 'Untitled'}
              </span>
            </h3>
          </div>
        </div>
        <div className="card-subtitle text-muted">
          {baseGroup.bases.length} x {baseGroup.baseSizeString}
        </div>
        <div>
          <GenericButton onClick={handleClickSettings} className={`btn btn-sm btn-light`}>
            <FaCog />
          </GenericButton>
          <GenericButton onClick={handleDeleteClick} className={`btn btn-sm btn-danger`}>
            <FaTimes />
          </GenericButton>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  baseGroups: selectors.getBaseGroups(state),
  canvas: selectors.getCanvas(state),
  selectedBaseGroupId: selectors.getSelectedBaseGroupId(state),
})

const GroupManagerCollapsed = connect(mapStateToProps, {
  deleteBaseGroup: baseGroups.actions.deleteBaseGroup,
  setSelectedBaseGroupId: canvas.actions.setSelectedBaseGroupId,
})(GroupManagerCollapsedComponent)

export default GroupManagerCollapsed
