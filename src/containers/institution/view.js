import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Image, Grid, Segment, Header } from 'semantic-ui-react'
import Overview from '../../components/institution/overview'
import { Thumbnail as InstitutionThumb } from '../../components/institution'
import OpportunityThumb from '../../components/opportunity/thumbnail'

import LocationMap from '../../components/location/map'
import { buildImageUrl } from '../../redux/utils'
import * as institutionActions from '../../redux/institution/actions'
import withAuthorization from '../authorization'
import { UserState } from '../authorization'
import { nologo } from '../../utils/constants'


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
    const { match, institutionFindResumeById} = this.props
    const { institutionId } = match.params

    if (institutionId) {
      institutionFindResumeById(institutionId)
    } else {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      const { key: next } = nextProps.location
      const { key } = this.props.location

      if (key !== next) {
        const { institutionFindResumeById } = this.props
        const { match } = nextProps
        const { institutionId } = match.params

        if (institutionId) {
          institutionFindResumeById(institutionId)
        }
      }
    }
  }

  render() {
    const { institution } = this.props
    if (institution && institution.current) {
      const inst = institution.current
      const { logo, resume: { dependencies, opportunities } } = inst
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">{inst.name}</Header>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Image src={logo ? buildImageUrl(logo.url): nologo} />
            </Segment>

          </Grid.Column>

          <Grid.Column width={10}>
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
                      <OpportunityThumb key={opp.name}
                        opportunity={opp} 
                      />
                    )
                  })
                }
              </Card.Group>
            </Segment>
            <Segment>
              <Header size="medium">Location</Header>
              <LocationMap
                name="location"
                onCenterChange={this.handleInputChange}
                data={(inst.location && inst.location.point) ? inst.location : this.state.currentLocation}
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

const connectedComponent = connect(
  (state) => ({
    account: state.account,
    institution: state.institution,
  }), 
  (dispatch) => ({
    institutionFindResumeById: (id) => dispatch(institutionActions.findResumeById(id)),
  })) (withRouter(View))

export default withAuthorization(connectedComponent, UserState.ACCOUNT)
