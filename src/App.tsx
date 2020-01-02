import React, { useState } from 'react'
import { Stage, Layer, Text, Circle } from 'react-konva'
import Konva from 'konva'
import './App.css'

const ColoredCircle = () => {
  const [color, setColor] = useState('green')

  console.log(Konva.Util.getRandomColor())

  return (
    <Circle
      x={30}
      y={50}
      radius={15}
      fill={color}
      shadowBlur={5}
      onClick={() => setColor(Konva.Util.getRandomColor())}
      draggable={true}
    />
  )
}

const App = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="For Darren Watson's eyes only" offsetX={-20} offsetY={-20} />
        {[...Array(5)].map((x, i) => (
          <ColoredCircle key={i} />
        ))}
      </Layer>
    </Stage>
  )
}

export default App
