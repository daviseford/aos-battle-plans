import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, rulers } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import GenericButton from './GenericButton'
import { IRuler } from 'types/rulers'
import { FaRulerVertical } from 'react-icons/fa'

interface IRulerMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  rulers: IRuler[]
  deleteRuler: (id: string) => void
  addRuler: (group: IRuler) => void
  updateRuler: (group: IRuler) => void
}

const createRuler = (rulerLength: number, canvas: ICanvasDimensions): IRuler => {
  return {
    id: shortid.generate(),
    x: 100,
    y: 100,
    color: 'black',
    height: 1 / canvas.conversionPercentY,
    width: rulerLength / canvas.conversionPercentX,
    canTransform: true,
    rulerLength,
  }
}

const RulerSelectMenuComponent: React.FC<IRulerMenu> = props => {
  const { canvas } = props

  const [rulerLength, setRulerLength] = useState(9)

  if (!canvas) return <></>

  const handleChange = e => {
    const val = parseInt(e.target.value || 0)
    setRulerLength(val)
  }

  const handleClick = e => {
    e.preventDefault()
    const ruler = createRuler(rulerLength, canvas)
    props.addRuler(ruler)
  }

  return (
    <div className={`d-flex justify-content-start align-items-center`}>
      <div className="">
        <input
          className="form-control"
          type="number"
          onChange={handleChange}
          placeholder={`${rulerLength}"`}
          min={1}
          max={72}
        />
      </div>
      <div className="flex-grow-1">
        <GenericButton onClick={handleClick}>
          <FaRulerVertical className="mr-2" />
          Add Ruler
        </GenericButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
  rulers: selectors.getRulers(state),
  scenario: selectors.getScenario(state),
})

const RulerSelectMenu = connect(mapStateToProps, {
  addRuler: rulers.actions.addRuler,
  deleteRuler: rulers.actions.deleteRuler,
  updateRuler: rulers.actions.updateRuler,
})(RulerSelectMenuComponent)

export default RulerSelectMenu
