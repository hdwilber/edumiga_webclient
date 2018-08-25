import { withTypesManager } from '../../shared/types'
import withApiService from '../../withApiService'
import InstitutionEditor from './editor'

export default withTypesManager(withApiService(InstitutionEditor))

