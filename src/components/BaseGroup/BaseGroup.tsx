import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Group } from 'react-konva'
import { selectors } from 'ducks'
import { mmToInches } from 'utils/measurements'
import CircleBase from 'components/Base/CircleBase'
import OvalBase from 'components/Base/OvalBase'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IBaseGroup } from 'types/bases'
import { chunk } from 'lodash'

interface ICCC {
  canvas: ICanvasDimensions
  baseGroup: IBaseGroup
}

const BaseGroupComponent: React.FC<ICCC> = props => {
  const { canvas, baseGroup } = props
  const [baseRadius, setBaseRadius] = useState([0, 0])

  useEffect(() => {
    const { baseSizeMM } = baseGroup
    // Determine if this is a Circle or Oval base
    if (baseSizeMM[0] === baseSizeMM[1]) {
      // Circle
      const convertedBaseSize = mmToInches(baseGroup.baseSizeMM[0]) / canvas.conversionPercentX / 2
      setBaseRadius([convertedBaseSize, convertedBaseSize])
    } else {
      // Oval
      const convertedBaseSizeX = mmToInches(baseGroup.baseSizeMM[0]) / canvas.conversionPercentX / 2
      const convertedBaseSizeY = mmToInches(baseGroup.baseSizeMM[1]) / canvas.conversionPercentY / 2
      setBaseRadius([convertedBaseSizeX, convertedBaseSizeY])
    }
  }, [baseGroup, canvas])

  if (!canvas || !baseGroup.bases.length) return <></>

  const cohesionX = 1 / canvas.conversionPercentX
  const cohesionY = 1 / canvas.conversionPercentY

  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesionX
  const getYSpacing = (radius: number) => radius * 2 + cohesionY

  const rows = chunk(baseGroup.bases, 10)

  const BaseComponent = baseRadius[0] === baseRadius[1] ? CircleBase : OvalBase

  return (
    <Group draggable={true}>
      {rows.map((bases, rowIndex) => {
        return bases.map((base, baseIndex) => (
          <BaseComponent
            key={baseIndex}
            baseGroup={baseGroup}
            base={{
              ...base,
              x: 30 + getXSpacing(baseRadius[0]) * baseIndex,
              y: 50 + getYSpacing(baseRadius[1]) * rowIndex,
            }}
            radius={baseRadius[0]} // Used by Circle
            // @ts-ignore
            radiusX={baseRadius[0]} // Used by Oval
            // @ts-ignore
            radiusY={baseRadius[1]} // Used by Oval
          />
        ))
      })}
    </Group>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const BaseGroup = connect(mapStateToProps, null)(BaseGroupComponent)

export default BaseGroup
