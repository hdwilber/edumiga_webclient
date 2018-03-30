export const MODAL_SHOW = 'MODAL_SHOW'
export const MODAL_HIDE = 'MODAL_HIDE'

export function checkIfVisible(list, target) {
  return !!list.find(n => n === target)
}

export function show(name) {
  return {
    type: MODAL_SHOW,
    payload: {
      name,
    }
  }
}

export function hide(name) {
  return {
    type: MODAL_HIDE,
    payload: {
      name,
    }
  }
}
