import { CategoryService } from '../../services'
import { dispatchRequestActions, createActionLabels } from '../utils'
export const FIND_ALL = createActionLabels('CAT_FIND_ALL')

const cService = new CategoryService()

export function findAll(options) {
  return (dispatch, getState) => {
    const request = cService.getAll()
    return dispatchRequestActions(dispatch, FIND_ALL, request, {}, options)
  }
}
