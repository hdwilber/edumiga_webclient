import { processAction } from './utils'
import { save, format, runSave, buildData, } from '../utils/converters'

class BaseActions {
  constructor(spec, services) {
    this.spec = spec
    this.services = services

  }

  format(data) {
    const formatted = format(this.spec, data)
    console.log(formatted)
    return formatted
  }

  save(data, oldData) {
    const savingSpecs = save(this.spec, data, oldData, this.services, 'Identity', {})
    console.log(savingSpecs)
    const promise = runSave(savingSpecs, {}, {})
    promise.then(data => {
      console.log('finsihed')
      console.log(data)
    })
    return {}
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

export default BaseActions

