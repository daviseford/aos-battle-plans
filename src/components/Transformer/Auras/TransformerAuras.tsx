import React, { useEffect } from 'react'
import { Layer, Transformer, Group, Text, Circle } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, auras } from 'ducks'
import { BACKSPACE_KEYCODE, DELETE_KEYCODE, ENTER_KEYCODE, ESCAPE_KEYCODE } from 'utils/keyCodes'
import { IAura } from 'types/auras'
import { getSnapDimensions } from 'utils/getSnapDimensions'

interface ICirc {
  canvas: ICanvasDimensions
  deleteAura: (id: string) => void
  setSelectedAura: (id: string | null) => void
  isSelected: boolean
  onSelect: any
  aura: IAura
  updateAura: (aura: IAura) => void
}

const SingleCircle: React.FC<ICirc> = props => {
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

  return (
    <Group draggable={true}>
      <Circle
        onClick={onSelect}
        // @ts-ignore
        ref={shapeRef}
        stroke={'black'}
        fill={'black'}
        {...aura}
        fillEnabled={true}
        draggable
        onDragEnd={e => {
          updateAura({
            ...aura,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={e => {
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

          // @ts-ignore
          const newWidth = Math.max(5, node.width() * scaleX)
          // @ts-ignore
          const newHeight = Math.max(node.height() * scaleY)

          // @ts-ignore
          const auraWidthInches = newWidth * canvas.conversionPercentX
          // @ts-ignore
          const auraHeightInches = newHeight * canvas.conversionPercentY
          const snapWidth = getSnapDimensions(auraWidthInches, canvas.conversionPercentX)
          const snapHeight = getSnapDimensions(auraHeightInches, canvas.conversionPercentY)

          console.log(newHeight, newWidth)
          console.log(snapHeight, snapWidth)

          updateAura({
            ...aura,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            width: snapWidth,
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

          // @ts-ignore
          const newWidth = Math.max(5, node.width() * scaleX)
          // @ts-ignore
          const newHeight = Math.max(node.height() * scaleY)

          updateAura({
            ...aura,
            // @ts-ignore
            x: node.x(),
            // @ts-ignore
            y: node.y(),
            // @ts-ignore
            width: newWidth,
            // @ts-ignore
            height: newHeight,
          })
        }}
      />

      <Text
        text={`${(aura.width * canvas.conversionPercentX).toFixed(2)}"`}
        stroke={`white`}
        fill={`white`}
        align={'center'}
        fontSize={16}
        x={aura.x - 5}
        y={aura.y}
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
})(SingleCircle)

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
