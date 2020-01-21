import React from 'react'
import { connect } from 'react-redux'
import { selectors, baseGroups, canvas } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IBaseGroup } from 'types/bases'
import GenericButton from '../Input/GenericButton'
import { genericButtonDanger } from 'theme/helperClasses'
import { CirclePicker } from 'react-color'
import { PICKER_COLORS } from 'theme/colors'
import { FaTimes } from 'react-icons/fa'

interface IGroupManager {
  baseGroup: IBaseGroup
  canvas: ICanvasDimensions
  baseGroups: IBaseGroup[]
  deleteBaseGroup: (id: string) => void
  updateBaseGroup: (group: IBaseGroup) => void
  selectedBaseGroup: IBaseGroup | null
  setSelectedBaseGroupId: (id: string | null) => void
}

const GroupManagerComponent: React.FC<IGroupManager> = props => {
  const { canvas, deleteBaseGroup, updateBaseGroup, selectedBaseGroup, setSelectedBaseGroupId } = props

  if (!canvas || !selectedBaseGroup) return <></>

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteBaseGroup(selectedBaseGroup.id)
  }

  const handleChangeComplete = (color, event) => {
    updateBaseGroup({ ...selectedBaseGroup, color: color.hex })
  }

  const handleCloseClick = e => {
    setSelectedBaseGroupId(null)
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="py-0 my-0 text-right">
          <FaTimes className="ml-5" onClick={handleCloseClick} />
        </div>
        <div className="text-center">{selectedBaseGroup.label || 'Untitled'}</div>
        <div className="card-subtitle mb-2 text-muted text-center">
          {selectedBaseGroup.bases.length} x {selectedBaseGroup.baseSizeString}
        </div>
        <div className="card-text">
          <div className="d-flex justify-content-center">
            {/* 
          // @ts-ignore */}
            <CirclePicker onChangeComplete={handleChangeComplete} colors={PICKER_COLORS} />
          </div>

          <br />
          <GenericButton onClick={handleDeleteClick} className={genericButtonDanger}>
            Delete
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
  selectedBaseGroup: selectors.getSelectedBaseGroup(state),
})

const GroupManager = connect(mapStateToProps, {
  deleteBaseGroup: baseGroups.actions.deleteBaseGroup,
  updateBaseGroup: baseGroups.actions.updateBaseGroup,
  setSelectedBaseGroupId: canvas.actions.setSelectedBaseGroupId,
})(GroupManagerComponent)

export default GroupManager
