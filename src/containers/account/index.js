import { withTypesManager } from '../shared/types'
import withApiService from '../withApiService'
import Editor from './identity'

export const IdentityEditor = withTypesManager(withApiService(Editor))

