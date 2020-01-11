import Konva from 'konva'
import { KonvaEventObject } from 'konva/types/Node'

export const dragScaleUp = (e: KonvaEventObject<DragEvent>) => {
  e.target.setAttrs({
    shadowOffset: {
      x: 2,
      y: 2,
    },
    scaleX: 1.1,
    scaleY: 1.1,
  })
}

export const dragEndBounce = (e: KonvaEventObject<DragEvent>) => {
  e.target.to({
    duration: 1,
    easing: Konva.Easings.ElasticEaseOut,
    scaleX: 1,
    scaleY: 1,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  })
}
