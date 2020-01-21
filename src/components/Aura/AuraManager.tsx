import React from 'react'
import { connect } from 'react-redux'
import { selectors, canvas, auras } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import GenericButton from '../Input/GenericButton'
import { genericButtonDanger } from 'theme/helperClasses'
import { CirclePicker } from 'react-color'
import { PICKER_COLORS } from 'theme/colors'
import { FaTimes } from 'react-icons/fa'
import { IAura } from 'types/auras'

interface IAuraManagerProps {
  canvas: ICanvasDimensions
  aura: IAura
  deleteAura: (id: string) => void
  updateAura: (group: IAura) => void
  selectedAura: IAura | null
  setSelectedAuraId: (id: string | null) => void
}

const AuraManagerComponent: React.FC<IAuraManagerProps> = props => {
  const { canvas, selectedAura, deleteAura, setSelectedAuraId, updateAura } = props

  if (!canvas || !selectedAura) return <></>

  const handleDeleteClick = e => {
    e.preventDefault()
    deleteAura(selectedAura.id)
  }

  const handleFillChangeComplete = (color, event) => {
    updateAura({ ...selectedAura, fill: color.hex })
  }

  const handleCloseClick = e => {
    setSelectedAuraId(null)
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="py-0 my-0 text-right">
          <FaTimes className="ml-5" onClick={handleCloseClick} />
        </div>
        {/* <div className="text-center">{selectedAura.label || 'Untitled'}</div>
        <div className="card-subtitle mb-2 text-muted text-center">
          {selectedAura.bases.length} x {selectedAura.baseSizeString}
        </div> */}
        <div className="card-text">
          <div className="d-flex justify-content-center">
            {/* 
          // @ts-ignore */}
            <CirclePicker onChangeComplete={handleFillChangeComplete} colors={PICKER_COLORS} />
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
  canvas: selectors.getCanvas(state),
  selectedAura: selectors.getSelectedAura(state),
})

const AuraManager = connect(mapStateToProps, {
  deleteAura: auras.actions.deleteAura,
  updateAura: auras.actions.updateAura,
  setSelectedAuraId: canvas.actions.setSelectedAuraId,
})(AuraManagerComponent)

export default AuraManager
