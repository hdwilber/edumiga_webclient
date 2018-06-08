import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Image, Label, Grid, Segment, Header, Icon } from 'semantic-ui-react'
import Overview from '../../components/institution/overview'
import { Thumbnail as InstitutionThumb } from '../../components/institution'

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
    const { match, institutionFindById} = this.props
    const { institutionId } = match.params

    if (institutionId) {
      institutionFindById(institutionId)
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

  render() {
    const { institution } = this.props
    if (institution && institution.current) {
      const inst = institution.current
      const { logo, dependencies } = inst
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
              <Header size="normal">Overview</Header>
              <Overview data={inst} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={16}>
            <Segment>
              <Header size="normal">Dependencies</Header>
              <Card.Group stackable itemsPerRow={5}>
                { dependencies.slice(0,5).map((dep,idx) => {
                    return (
                      <InstitutionThumb key={dep.id}
                        institution={dep} 
                      />
                    )
                  })
                }
              </Card.Group>
            </Segment>
            <Segment>
              <Header size="normal">Opportunities</Header>
            </Segment>
            <Segment>
              <Header size="normal">Location</Header>
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
    institutionFindById: (id) => dispatch(institutionActions.findById(id)),
  })) (withRouter(View))

export default withAuthorization(connectedComponent, UserState.ACCOUNT)
