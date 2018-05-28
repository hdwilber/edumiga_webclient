import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Sidebar, Grid, Card, Header } from 'semantic-ui-react'
import { Card as InstitutionCard, View as InstitutionView } from '../../components/institution'

import { ActionTypes } from '../../components/institution/card'

import * as institutionActions from '../../redux/institution/actions'

class InstList extends React.Component {
  constructor(props) {
    super(props)
    this.handleCardAction = this.handleCardAction.bind(this)
    this.state = {
      showDetails: false,
    }
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
    window.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
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

  handleCardClick = (event, institution) => {
    event.preventDefault()
    const { institutionSet } = this.props
    institutionSet(institution)
    this.setState({
      showDetails: true,
    })
  }

  handleKeydown = (e) => {
    if (!e.defaultPrevented) {
      switch(e.key) {
        case 'Escape':
          this.setState({ showDetails: false })
        break;
      }
    }
    e.preventDefault()
  }

  render() {
    const { account, institution } = this.props
    if (institution) {
      return (
        <Sidebar.Pushable as={Grid} columns={16}> 
          <Sidebar direction="right" width="very wide" visible={this.state.showDetails}>
            <InstitutionView institution={institution.current} />
          </Sidebar>
          <Sidebar.Pusher>
            <Header size="huge">Institutions</Header>
            <Card.Group stackable itemsPerRow={4}>
              {(institution.list) &&(
                institution.list.map((i,idx) => {
                  return (
                    <InstitutionCard key={idx} session={account && account.session} 
                      institution={i} 
                      onAction={this.handleCardAction}
                      onClick={(e) => this.handleCardClick(e, i)}
                    />
                  )
                })
              )}
            </Card.Group>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
  institutionSet: (inst) => dispatch(institutionActions.setCurrent(inst)),
})) (withRouter(InstList))
