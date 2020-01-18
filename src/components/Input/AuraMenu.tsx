import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, auras } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import GenericButton from './GenericButton'
import { IAura } from 'types/auras'
import { FaRegCircle } from 'react-icons/fa'

interface IAuraMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  auras: IAura[]
  deleteAura: (id: string) => void
  addAura: (aura: IAura) => void
  updateAura: (aura: IAura) => void
}

const createAura = (diameter: number, canvas: ICanvasDimensions): IAura => {
  return {
    id: shortid.generate(),
    x: 100,
    y: 100,
    stroke: 'black',
    fill: `#dfeff7`,
    strokeWidth: 7,
    height: diameter / canvas.conversionPercentY,
    width: diameter / canvas.conversionPercentX,
    canTransform: true,
  }
}

const AuraSelectMenuComponent: React.FC<IAuraMenu> = props => {
  const { canvas } = props

  const [diameter, setDiameter] = useState(9)

  if (!canvas) return <></>

  const handleChange = e => {
    const val = parseInt(e.target.value || 0)
    setDiameter(val)
  }

  const handleClick = e => {
    e.preventDefault()
    const ruler = createAura(diameter, canvas)
    props.addAura(ruler)
  }

  return (
    <div className={`d-flex justify-content-start align-items-center`}>
      <div className="">
        <input
          className="form-control"
          type="number"
          onChange={handleChange}
          placeholder={`${diameter}"`}
          min={1}
          max={36}
        />
      </div>
      <div className="flex-grow-1">
        <GenericButton onClick={handleClick}>
          <FaRegCircle className="mr-2" />
          Add Aura
        </GenericButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
  auras: selectors.getAuras(state),
  scenario: selectors.getScenario(state),
})

const AuraMenu = connect(mapStateToProps, {
  addAura: auras.actions.addAura,
  deleteAura: auras.actions.deleteAura,
  updateRuler: auras.actions.updateAura,
})(AuraSelectMenuComponent)

export default AuraMenu
