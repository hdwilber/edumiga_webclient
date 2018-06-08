import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Label, Grid, Segment, Header, Icon } from 'semantic-ui-react'
import Overview from '../../components/institution/overview'

import LocationMap from '../../components/location/map'
import { buildImageUrl } from '../../redux/utils'
import * as institutionActions from '../../redux/institution/actions'

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
    const { match, institutionFindResumeById } = this.props
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

  render() {
    const { institution } = this.props
    if (institution && institution.current) {
      const inst = institution.current
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">{inst.name}</Header>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              { inst.logo 
                ? <Image src={buildImageUrl(inst.logo.url)} />
                : <Icon name="building"/>
              }
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

          <Grid.Column width={10}>
            <Segment>
              <Header size="normal">Overview</Header>
              <Overview data={inst} />
            </Segment>

            <Segment>
              <Header size="normal">Opportunities</Header>
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

export default connect((state) => ({
  account: state.account,
  institution: state.institution,
}), (dispatch) => ({
  institutionFindResumeById: (id) => dispatch(institutionActions.findResumeById(id)),
})) (withRouter(View))
