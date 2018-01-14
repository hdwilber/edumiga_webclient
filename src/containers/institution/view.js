import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Grid, Button, Segment, Header } from 'semantic-ui-react'
import { FormOverview } from '../../components/institution'
import Overview from '../../components/institution/overview'

import LocationMap from '../../components/location/map'

import OpportunityForm from '../../components/opportunity/create'
import OpportunitiesList from '../../components/opportunity/list'
import SimpleMediaUploader from '../../components/media/image-uploader'

import { buildImageUrl } from '../../redux/utils'

import * as institutionActions from '../../redux/institution/actions'
import { uploadLogo } from '../../redux/opportunity/actions'

import { Actions as OppListActions } from '../../components/opportunity/list'

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
    const { match, institutionFind } = this.props
    const { institutionId } = match.params

    if (institutionId) {
      institutionFind(institutionId)
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
              <Image src={buildImageUrl(inst.logo.url)} />
            </Segment>
            <Segment>
              <Header size="normal">Location</Header>
              <LocationMap
                name="location"
                onCenterChange={this.handleInputChange}
                data={inst.location.point ? inst.location : this.state.currentLocation}
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
  institutionFind: (id) => dispatch(institutionActions.findById(id)),
})) (withRouter(View))
