import React from 'react'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IScenario } from 'types/scenario'
import { IBaseGroup } from 'types/bases'
import RulerSelectMenu from 'components/Input/RulerMenu'

interface IBottomToolbar {
  baseGroups: IBaseGroup[]
  canvas: ICanvasDimensions
  scenario: IScenario
  setScenario: (name: string) => void
}

const BottomToolbarComponent: React.FC<IBottomToolbar> = props => {
  const { canvas } = props

  if (!canvas) return <></>

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-info text-center justify-content-center">
          <div className="col-6">
            <RulerSelectMenu />
          </div>
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

const BottomToolbar = connect(mapStateToProps, {})(BottomToolbarComponent)

export default BottomToolbar
