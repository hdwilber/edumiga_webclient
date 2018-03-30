import * as actions from './actions'

const initialState = {
  visibleModals: [],
  hiddenModals: [],

}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case actions.MODAL_SHOW: {
      const { name } = action.payload
      const foundVisible = state.visibleModals.find(n => {
        return (n === name)
      })

      const newVisibleList = (!foundVisible) ? state.visibleModals.concat([name])
        : state.visibleModals

      return {
        ...state,
        visibleModals: newVisibleList,
      }
    }
    case actions.MODAL_HIDE: {
      const { name } = action.payload
      const newList = state.visibleModals.filter(n => {
        if (n === name) return false
        return true
      })

      return {
        ...state,
        visibleModals: newList,
      }
    }
  }
  return state
}
