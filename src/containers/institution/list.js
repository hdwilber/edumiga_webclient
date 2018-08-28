import React from 'react'
import { connect } from 'react-redux'
import { Modal, Card, Header } from 'semantic-ui-react'
import { Card as InstitutionCard, Resume as InstitutionResume } from '../../components/institution'

import { ActionTypes } from '../../components/institution/card'
import withApiService from '../withApiService'
import { withTypesManager } from '../shared/types'
import withAuthorization from '../authorization'
import { UserState } from '../authorization'

class InstList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      detailsModal: {
        institution: null,
      }
    }
  }

  componentDidMount() {
    this.findAllResumes()
  }

  findAllResumes = () => {
    const { typesManager: { institution } } = this.props
    institution.findAll()
  }

  handleCardAction = (type, institution) => {
    if(type === ActionTypes.DELETE) {
      const { typesManager: { institution } } = this.props
      institution.delete(institution.id)
    }
  }

  handleCardClick = (event, institution) => {
    event.preventDefault()
    this.setState({
      showDetails: true,
      detailsModal: {
        institution,
      }
    })
  }

  handleDetailsModalClose = (e) => {
    this.setState({
      showDetails: false,
      detailsModal: {
        institution: null,
      }
    })
  }

  handleClickDependency = (dep) => {
    const { id } = dep
    const { history } = this.props
    history.push(`/institution/${id}`)
  }

  handleClickOpportunity = (opp) => {
    const { id } = opp
    const { history } = this.props
    history.push(`/opportunity/${id}`)
  }

  render() {
    const { session, institutions, size = "huge" } = this.props
    if (institutions) {
      const { showDetails, detailsModal } = this.state
      return (
        <React.Fragment>
            <Header size={size}>Institutions</Header>
            <Card.Group stackable itemsPerRow={4}>
              {(institutions) &&(
                institutions.map((i,idx) => {
                  return (
                    <InstitutionCard key={idx} session={session} 
                      institution={i} 
                      onAction={this.handleCardAction}
                      onClick={(e) => this.handleCardClick(e, i)}
                    />
                  )
                })
              )}
            </Card.Group>
          <Modal 
            onClose={this.handleDetailsModalClose}
            closeOnDocumentClick 
            open={showDetails}>
            <InstitutionResume
              institution={detailsModal.institution}
              onClickDependency={this.handleClickDependency}
              onClickOpportunity={this.handleClickOpportunity}
            />
          </Modal>
        </React.Fragment>
      )
    } else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

function mapStateToProps(state) {
  const { institution, account } = state
  return {
    institutions: institution.list,
    session: account.session,
    constants: institution.constants,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps) (InstList)
export default withTypesManager(withApiService(withAuthorization(ConnectedComponent, UserState.ACCOUNT)))
