import { Service } from '../../services'
import { createActionLabels, handleRequest } from '../utils'

export const GET = createActionLabels('CONSTANTS_GET')

const service = new Service()

export function get(list) {
  return (dispatch, getState) => {
    const request = service.getConstants(list)
    return handleRequest(dispatch, getState, GET, request,
      (data) => ({
        list: list,
        data: data,
      }))
  }
}
