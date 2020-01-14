import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, auras } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import GenericButton from './GenericButton'
import { IAura } from 'types/auras'

interface IAuraMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  auras: IAura[]
  deleteAura: (id: string) => void
  addAura: (aura: IAura) => void
  updateAura: (aura: IAura) => void
}

const createAura = (radius: number, canvas: ICanvasDimensions): IAura => {
  return {
    id: shortid.generate(),
    x: 100,
    y: 100,
    color: 'black',
    height: 1 / canvas.conversionPercentY,
    width: radius / canvas.conversionPercentX,
    canTransform: true,
    // radius,
  }
}

const AuraSelectMenuComponent: React.FC<IAuraMenu> = props => {
  const { canvas } = props

  const [radius, setRadius] = useState(9)

  if (!canvas) return <></>

  const handleChange = e => {
    const val = parseInt(e.target.value || 0)
    setRadius(val)
  }

  const handleClick = e => {
    e.preventDefault()
    const ruler = createAura(radius, canvas)
    props.addAura(ruler)
  }

  return (
    <div className="row justify-content-center pb-3">
      <div className="col">
        <input
          className="form-control"
          type="number"
          onChange={handleChange}
          value={radius}
          min={1}
          max={36}
        />
      </div>
      <div className="col-5">
        <GenericButton onClick={handleClick}>Add Aura</GenericButton>
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
