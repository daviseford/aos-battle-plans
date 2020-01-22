import React from 'react'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import { IBaseGroup } from 'types/bases'
import RulerSelectMenu from 'components/Input/RulerMenu'
import AuraMenu from 'components/Input/AuraMenu'

interface IBottomToolbar {
  baseGroups: IBaseGroup[]
  canvas: ICanvasDimensions
  scenario: IScenario
}

const MarkupToolbarComponent: React.FC<IBottomToolbar> = props => {
  const { canvas } = props

  if (!canvas) return <></>

  return (
    <>
      <div className={`d-flex justify-content-center align-items-center mt-2`}>
        <div className="w-30 mr-3">
          <RulerSelectMenu />
        </div>
        <div className="w-30">
          <AuraMenu />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const MarkupToolbar = connect(mapStateToProps, {})(MarkupToolbarComponent)

export default MarkupToolbar
