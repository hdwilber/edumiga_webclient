import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Header } from 'semantic-ui-react'
import { Card as InstitutionCard } from '../../components/institution'

import * as institutionActions from '../../redux/institution/actions'

class InstList extends React.Component {

  componentDidMount() {
    const { institutionFindAll } = this.props
    institutionFindAll()
  }

  render() {
    const { institution } = this.props
    if (institution) {
      return (
        <div>
          <Header size="huge">Institutions</Header>

          <Card.Group>
            {(institution.list) &&(
              institution.list.map(i => {
                return (
                  <InstitutionCard institution={i} />
                )
              })
            )}
          </Card.Group>
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
  institutionFindAll: (filter) => dispatch(institutionActions.findAll(filter)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
})) (withRouter(InstList))
