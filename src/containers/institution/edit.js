import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Form as InstitutionForm} from '../../components/institution'

import * as institutionActions from '../../redux/institution/actions'


class Create extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    const { match, institutionFind } = this.props
    const { institutionId } = match.params

    if (institutionId) {
      institutionFind(institutionId)
    } else {
      const { institutionCreate } = this.props
      institutionCreate({})
    }

  }

  handleSave(data) {
    const { institution, institutionUpdate } = this.props
    institutionUpdate({
      ...institution.current,
      ...data,
    })
  }

  render() {
    const { institution } = this.props
    if (institution) {
      return (
        <div>
          <Header size="huge">Add a new Institution</Header>
          {(institution.current) &&(
            <InstitutionForm institution={institution.current} onSave={this.handleSave}
            />
          )}
        </div>
      )
    } else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account,
  institution: state.institution,
}), (dispatch) => ({
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
  institutionFind: (id) => dispatch(institutionActions.findById(id)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
})) (withRouter(Create))
