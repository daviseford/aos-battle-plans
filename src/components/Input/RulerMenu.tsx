import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'
import { selectors, rulers } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import GenericButton from './GenericButton'
import { IRuler } from 'types/rulers'

interface IRulerMenu {
  canvas: ICanvasDimensions
  scenario: IScenario
  rulers: IRuler[]
  deleteRuler: (id: string) => void
  addRuler: (group: IRuler) => void
  updateRuler: (group: IRuler) => void
}

const createRuler = (rulerLengthInches: number): IRuler => {
  return {
    id: shortid.generate(),
    x: 100,
    y: 100,
    color: 'black',
    height: 10,
    width: 100,
    canTransform: false,
  }
}

const RulerSelectMenuComponent: React.FC<IRulerMenu> = props => {
  const { canvas } = props

  if (!canvas) return <></>

  const handleClick = e => {
    e.preventDefault()
    const ruler = createRuler(10)
    props.addRuler(ruler)
  }

  return (
    <div className="row justify-content-center pb-3">
      <div className="col">
        <input className="form-control" type="number" placeholder="Ruler Length (Inches)" min={1} max={72} />
      </div>
      <div className="col-3">
        <GenericButton onClick={handleClick}>Add Ruler</GenericButton>
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
