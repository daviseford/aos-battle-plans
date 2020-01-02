import React from 'react'
import { Stage, Layer, Text } from 'react-konva'
import './App.css'
import CircleBase from 'components/circleBase'

const App = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer

  const radius = 12.5
  const xSpacing = radius * 3

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="For Darren Watson's eyes only" offsetX={-20} offsetY={-20} />
        {[...Array(5)].map((x, i) => (
          <CircleBase key={i} x={30 + xSpacing * i} y={50} radius={radius} />
        ))}
      </Layer>
    </Stage>
  )
}

export default App
