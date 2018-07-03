import { Opportunity, buildData, parseData, saveData } from '../utils/types'
import { processAction } from './utils'

export class TypeActions {
  constructor(spec, services) {
    this.spec = spec
    this.services = services

  }

  format(data) {
    return parseData(this.spec, data)
  }

  build(data) {
    return buildData(this.spec, data)
  }

  attachMethods() {
    Object.keys(this).forEach( name => {
      console.log(typeof this[name])
      if (typeof this[name] === 'function') {
        if (name !== 'format' && name !== 'build' && name !== 'attachMethods' && name !== 'dispatchAction') {
          this[name] = this.dispatchAction(this[name])
        }
      }
    })
  }

  dispatchAction(func) {
    return function(...args) {
      this.dispatch((dispatch, getState) => {
          const info = func.apply(this, args)
          return processAction(dispatch, info)
        }
      )
    }
  }
}

export default TypeActions

