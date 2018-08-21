import { processAction } from './utils'
import { save, format, saveRun, runSave, runSave2, buildData, } from '../utils/converters'

class BaseActions {
  constructor(spec, services) {
    this.spec = spec
    this.services = services

  }

  format(data) {
    const formatted = format(this.spec, data)
    return formatted
  }

  save(data, oldData) {
    const savingSpecs = save(this.spec, 'Root', data, oldData, {})
    console.log(savingSpecs)
    console.log('calling the saving funtion')

    const promise = saveRun(savingSpecs, {}, this.services, {})
    promise.then(data => {
      console.log('FINSISHED')
      console.log(data)
    })
    .catch(error => {
      console.log('something went wrong, we are going to solve the issue')
      console.log(error)
    })
    return {}
  }

  build(data) {
    return buildData(this.spec, data)
  }

  attachMethods() {
    Object.keys(this).forEach( name => {
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

