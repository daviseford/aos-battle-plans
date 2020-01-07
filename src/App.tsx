import React from 'react'
import { Stage, Layer, Text, Group } from 'react-konva'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import CircleBase from 'components/circleBase'
import { mmToInches } from 'utils/measurements'

const App = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer

  // Inches to mm
  const [tableX, tableY] = [72, 48]
  const canvasX = window.innerWidth
  const conversionPercentX = tableX / canvasX

  const canvasY = canvasX * (tableY / tableX)

  const baseSize25 = mmToInches(25) / conversionPercentX
  const baseSize32 = mmToInches(32) / conversionPercentX
  const baseSize50 = mmToInches(50) / conversionPercentX

  const cohesion = 1 / conversionPercentX

  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesion

  debugger

  return (
    <>
      <div className="container bg-info text-white">Sample toolbar color</div>
      <div className="bg-dark text-white pb-5">
        <Stage width={canvasX} height={canvasY} style={{ backgroundColor: 'white' }}>
          <Layer>
            <Text text="For Darren Watson's eyes only" offsetX={-20} offsetY={-20} />
            <Group draggable={true}>
              {[...Array(5)].map((x, i) => (
                <CircleBase key={i} x={30 + getXSpacing(baseSize25) * i} y={50} radius={baseSize25} />
              ))}
            </Group>
            <Group draggable={true}>
              {[...Array(5)].map((x, i) => (
                <CircleBase
                  key={i}
                  x={30 + getXSpacing(baseSize32) * i}
                  y={50 + getXSpacing(baseSize32)}
                  radius={baseSize32}
                />
              ))}
            </Group>
            <Group draggable={true}>
              {[...Array(5)].map((x, i) => (
                <CircleBase
                  key={i}
                  x={30 + getXSpacing(baseSize50) * i}
                  y={50 + getXSpacing(baseSize32) + getXSpacing(baseSize50)}
                  radius={baseSize50}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
        Bottom of Stage
      </div>
    </>
  )
}

export default App
