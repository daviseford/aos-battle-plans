import Konva from 'konva'
import { KonvaPointerEvent } from 'konva/types/PointerEvents'

export const dragScaleUp = (e: KonvaPointerEvent) => {
  e.target.setAttrs({
    shadowOffset: {
      x: 2,
      y: 2,
    },
    scaleX: 1.1,
    scaleY: 1.1,
  })
}

export const dragEndBounce = (e: KonvaPointerEvent) => {
  e.target.to({
    duration: 1,
    easing: Konva.Easings.ElasticEaseOut,
    scaleX: 1,
    scaleY: 1,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  })
}
