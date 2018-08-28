import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Icon, Button, Card, Image, Grid, Segment, Header } from 'semantic-ui-react'
import Overview from '../../components/institution/overview'
import { Thumbnail as InstitutionThumb } from '../../components/institution'
import OpportunityThumb from '../../components/opportunity/thumbnail/thumbnail'

import LocationViewer from '../../components/location/viewer'
import { buildImageUrl } from '../../utils/image-url'
import withAuthorization from '../authorization'
import { UserState } from '../authorization'
import { nologo } from '../../utils/constants'
import withApiService from '../withApiService'
import { withTypesManager } from '../shared/types'

class View extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      currentLocation: {
        point: {
          lat: 0,
          lng: 0,
        },
        zoom: 3,
      }
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { institutionId } = match.params

    if (!this.findResume(institutionId)) {
      const { history } = this.props
      history.pop()
    }
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleInstitutionClick = (institution) => {
    const { history } = this.props
    history.push(`/institution/${institution.id}`)
  }
  handleOpportunityClick = (opportunity) => {
    const { history } = this.props
    history.push(`/opportunity/${opportunity.id}`)
  }

  findResume(id) {
    if (id) {
      const { typesManager: { institution } } = this.props
      institution.findResume(id)
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      const { key: next } = nextProps.location
      const { key } = this.props.location

      if (key !== next) {
        const { match } = nextProps
        const { institutionId } = match.params
        this.findResume(institutionId)
      }
    }
  }

  prepareLocations(main, deps = []) {
    const locations = deps.reduce( (acc, dep) => {
      if (dep.location) {
        acc.push({
          point: dep.location.point,
          info: `${dep.prename} ${dep.name}`,
        })
      }
      return acc
    }, [])

    if (main.location) {
      locations.push({
        point: main.location.point,
        info: `${main.prename} ${main.name}`,
      })
    }

    return locations
  }

  renderActionButtons() {
    const { institution: { id } } = this.props
    const targetLink = `/institution/${id}/editor`
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          as={Link}
          to={targetLink}
          primary
        >
          <Icon name="eye" />
          Editor
        </Button>
      </Button.Group>
    )
  }

  render() {
    const { processing, institution: inst } = this.props
    if (!processing && inst) {
      const { logo, resume: { dependencies, opportunities } = {} } = inst
      const locations = this.prepareLocations(inst, dependencies)
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">
              {inst.name}
              {this.renderActionButtons()}
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <Image src={logo ? buildImageUrl(logo.url): nologo} />
            </Segment>

          </Grid.Column>

          <Grid.Column width={12}>
            <Segment>
              <Header size="medium">Overview</Header>
              <Overview data={inst} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={16}>
            <Segment>
              <Header size="medium">Dependencies</Header>
              <Card.Group stackable itemsPerRow={5}>
                { dependencies && dependencies.slice(0,5).map((dep,idx) => {
                    return (
                      <InstitutionThumb key={dep.id}
                        onClick={() => this.handleInstitutionClick(dep)}
                        institution={dep} 
                      />
                    )
                  })
                }
              </Card.Group>
            </Segment>
            <Segment>
              <Header size="medium">Opportunities</Header>
              <Card.Group stackable itemsPerRow={5}>
                { opportunities && opportunities.slice(0,5).map((opp,idx) => {
                    return (
                      <OpportunityThumb 
                        key={opp.name}
                        onClick={() => this.handleOpportunityClick(opp)}
                        opportunity={opp} 
                      />
                    )
                  })
                }
              </Card.Group>
            </Segment>
            <Segment>
              <Header size="medium">Location</Header>
              <LocationViewer
                locations={locations}
                main={{...locations[0], zoom: 14}}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      )
    }
    else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

function mapStateToProps (state) {
  const { institution } = state
  return {
    institution: institution.current,
    processing: institution.loading,
    constants: {
      ...institution.constants,
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
  ) (withRouter(View))

export default withTypesManager(withApiService(withAuthorization(ConnectedComponent, UserState.ACCOUNT)))
