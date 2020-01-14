import React, { useEffect } from 'react'
import { Layer, Rect, Transformer, Group, Text, Circle } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, auras } from 'ducks'
import { getSnapDimensions } from 'utils/getSnapDimensions'
import { BACKSPACE_KEYCODE, DELETE_KEYCODE, ENTER_KEYCODE, ESCAPE_KEYCODE } from 'utils/keyCodes'
import { IAura } from 'types/auras'

interface ICirc {
  canvas: ICanvasDimensions
  deleteAura: (id: string) => void
  setSelectedAura: (id: string | null) => void
  isSelected: boolean
  onSelect: any
  aura: IAura
  updateAura: (aura: IAura) => void
}

const SingleRect: React.FC<ICirc> = props => {
  const { aura, isSelected, onSelect, canvas, deleteAura, updateAura, setSelectedAura } = props
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // @ts-ignore
      trRef.current.setNode(shapeRef.current)
      // @ts-ignore
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === BACKSPACE_KEYCODE || e.keyCode === DELETE_KEYCODE) {
        e.preventDefault()
        deleteAura(aura.id)
      } else if (e.keyCode === ENTER_KEYCODE || e.keyCode === ESCAPE_KEYCODE) {
        e.preventDefault()
        setSelectedAura(null)
      }
    }

    if (isSelected && aura) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelected, deleteAura, aura, setSelectedAura])

  const inchesWidth = (canvas.conversionPercentX * aura.width).toFixed(2)
  const inchesHeight = (canvas.conversionPercentY * aura.height).toFixed(2)

  return (
    <Group draggable={true}>
      <Circle
        onClick={onSelect}
        // @ts-ignore
        ref={shapeRef}
        fill={'black'}
        stroke={'black'}
        {...aura}
        draggable
        onDragEnd={e => {
          updateAura({
            ...aura,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current

          // @ts-ignore
          node.scaleX(1)
          // @ts-ignore
          node.scaleY(1)

          // @ts-ignore
          const rulerWidthInches = node.width() * canvas.conversionPercentX
          // @ts-ignore
          const rulerHeightInches = node.height() * canvas.conversionPercentY
          const snapWidth = getSnapDimensions(rulerWidthInches, canvas.conversionPercentX)
          const snapHeight = getSnapDimensions(rulerHeightInches, canvas.conversionPercentY)

          updateAura({
            ...aura,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            width: snapWidth, // set minimal value
            height: snapHeight,
          })
        }}
        onTransform={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          // @ts-ignore
          const scaleX = node.scaleX()
          // @ts-ignore
          const scaleY = node.scaleY()

          // we will reset it back
          // @ts-ignore
          node.scaleX(1)
          // @ts-ignore
          node.scaleY(1)

          updateAura({
            ...aura,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            // @ts-ignore
            width: Math.max(5, node.width() * scaleX), // set minimal value
            // @ts-ignore
            height: Math.max(node.height() * scaleY),
          })
        }}
        rotationSnaps={[0, 90, 180, 270]}
      />

      <Text
        text={`${inchesWidth}" x ${inchesHeight}"`}
        stroke={`black`}
        fill={`white`}
        align={'center'}
        fontSize={16}
        x={aura.x + aura.width / 6}
        y={aura.y + aura.height + 2}
      />

      {isSelected && (
        <Transformer
          // @ts-ignore
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
          keepRatio={false}
        />
      )}
    </Group>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const ConnectedCircle = connect(mapStateToProps, {
  deleteAura: auras.actions.deleteAura,
  setSelectedAura: auras.actions.setSelectedId,
  updateAura: auras.actions.updateAura,
})(SingleRect)

type TTransformerRect = React.FC<{
  auras: IAura[]
  selectedAuraId: string | null
  setSelectedAura: (id: string | null) => void
}>

const TransformerRulersComponent: TTransformerRect = props => {
  const { auras, selectedAuraId, setSelectedAura } = props

  return (
    <Layer>
      {auras
        .filter(x => x.canTransform)
        .map((aura, i) => {
          return (
            <ConnectedCircle
              key={i}
              aura={aura}
              isSelected={aura.id === selectedAuraId}
              onSelect={() => {
                setSelectedAura(aura.id)
              }}
            />
          )
        })}
    </Layer>
  )
}

const mapStateToProps2 = (state: IStore, ownProps) => ({
  ...ownProps,
  auras: selectors.getAuras(state),
  selectedAuraId: selectors.getSelectedAuraId(state),
})

const TransformerAuras = connect(mapStateToProps2, {
  setSelectedAura: auras.actions.setSelectedId,
})(TransformerRulersComponent)

export default TransformerAuras
