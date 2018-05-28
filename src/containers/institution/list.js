import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Card, Header } from 'semantic-ui-react'
import { Card as InstitutionCard } from '../../components/institution'

import { ActionTypes } from '../../components/institution/card'

import * as institutionActions from '../../redux/institution/actions'

class InstList extends React.Component {
  constructor(props) {
    super(props)
    this.handleCardAction = this.handleCardAction.bind(this)
  }

  componentDidMount() {
    const { location, institutionFindAllResumes } = this.props
    const { owned } = location.query

    if (owned === 'me') {
      const { institutionFindAllOwned } = this.props
      institutionFindAllOwned()
    } else {
      institutionFindAllResumes()
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location && nextProps.location.key) {
      if (nextProps.location.key !== this.props.location.key) {
        const { owned } = nextProps.location.query
        if (owned === 'me') {
          const { institutionFindAllOwned } = this.props
          institutionFindAllOwned()
        } else {
          const { institutionFindAllResumes } = this.props
          institutionFindAllResumes()
        }
      }
    }
  }

  handleCardAction(type, institution) {
    if(type === ActionTypes.DELETE) {
      const {institutionDelete} = this.props
      institutionDelete(institution.id, {inList: true})
    }
  }

  render() {
    const { account, institution } = this.props
    if (institution) {
      return (
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="huge">Institutions</Header>
              <Card.Group stackable itemsPerRow={4}>
                {(institution.list) &&(
                  institution.list.map((i,idx) => {
                    return (
                      <InstitutionCard key={idx} session={account && account.session} 
                        institution={i} 
                        onAction={this.handleCardAction}
                      />
                    )
                  })
                )}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
  institutionFindAllResumes: (filter) => dispatch(institutionActions.findAllResumes(filter)),
  institutionFindAllOwned: (filter) => dispatch(institutionActions.findAllOwned(filter)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
  institutionDelete: (id, opts) => dispatch(institutionActions.deleteI(id, opts)),
})) (withRouter(InstList))
