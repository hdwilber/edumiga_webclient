import { withTypesManager } from '../../shared/types'
import withApiService from '../../withApiService'
import OpportunityEditor from './editor'

export default withTypesManager(withApiService(OpportunityEditor))

