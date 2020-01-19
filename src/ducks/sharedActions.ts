import { store } from 'index'
import { auras } from './auras'
import { rulers } from './rulers'

type TSelectionType = 'stage' | 'ruler' | 'aura'

export const setSelectedIdInStore = (type: TSelectionType, id: string | null): void => {
  console.log(`setting ${type} to ${id}`)
  if (type === 'stage') {
    store.dispatch(auras.actions.setSelectedId(null))
    store.dispatch(rulers.actions.setSelectedId(null))
    return
  }

  if (type === 'aura') {
    store.dispatch(auras.actions.setSelectedId(id))
    store.dispatch(rulers.actions.setSelectedId(null))
  }

  if (type === 'ruler') {
    store.dispatch(auras.actions.setSelectedId(null))
    store.dispatch(rulers.actions.setSelectedId(id))
  }
}
