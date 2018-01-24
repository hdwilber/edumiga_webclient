import { Service } from '../../services'
import { handleRequest } from '../utils'

export const GET = {
  START: 'CONSTANTS_GET',
  REJECTED: 'CONSTANTS_GET_REJECTED',
  FULFILLED: 'CONSTANTS_GET_FULFILLED',
}

const service = new Service()
export function get(list) {
  return (dispatch, getState) => {
    const request = service.getConstants(list)
    return handleRequest(dispatch, getState, GET.START, request,
      (data) => ({
        list: list,
        data: data,
      }))
  }
}
