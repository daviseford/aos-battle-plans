import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Group } from 'react-konva'
import { selectors } from 'ducks'
import { mmToInches } from 'utils/measurements'
import CircleBase from 'components/CircleBase'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { IBaseGroup } from 'types/bases'

interface ICCC {
  canvas: ICanvasDimensions
  baseGroup: IBaseGroup
}

const BaseGroupComponent: React.FC<ICCC> = props => {
  const { canvas, baseGroup } = props
  const [baseRadius, setBaseRadius] = useState(0)

  useEffect(() => {
    const { baseSizeMM } = baseGroup
    // Determine if this is a Circle or Oval base
    if (baseSizeMM[0] === baseSizeMM[1]) {
      // Circle
      const convertedBaseSize = mmToInches(baseGroup.baseSizeMM[0]) / canvas.conversionPercentX / 2
      setBaseRadius(convertedBaseSize)
    } else {
      // Oval
      // TODO FIX THIS to be an oval component
      const convertedBaseSize = mmToInches(baseGroup.baseSizeMM[0]) / canvas.conversionPercentX / 2
      setBaseRadius(convertedBaseSize)
    }
  }, [baseGroup, canvas])

  if (!canvas || !baseGroup.bases.length) return <></>

  const cohesion = 1 / canvas.conversionPercentX
  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesion

  return (
    <>
      <Group draggable={true}>
        {[...Array(5)].map((x, i) => (
          <CircleBase key={i} x={30 + getXSpacing(baseRadius) * i} y={50} radius={baseRadius} />
        ))}
      </Group>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const BaseGroup = connect(mapStateToProps, null)(BaseGroupComponent)

export default BaseGroup
