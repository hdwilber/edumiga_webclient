import React from 'react'
import { Modal, Grid, Header, Image } from 'semantic-ui-react'
import { buildImageUrl } from '../../redux/utils'
import LocationMap from '../../components/location/map'
import { nologo } from '../../utils/constants'

const View = props => {
  const { institution, headerComponent, contentComponent} = props

  if(institution) {
    console.log('La iew')
    console.log(institution)
    const { 
      dependencies, 
      opportunities, 
      prename, 
      name, description, location, logo } = institution
    return (
      <React.Fragment>
        <Modal.Content>
          <Grid container>
            <Grid.Column width={12}>
              <Header size="tiny">{prename}</Header>
              <Header size="large">{name}</Header>
              <p>{description}</p>
              <Grid>
                <Grid.Column width={8}>
                  <Header size="small">Dependencies: {dependencies.length}</Header>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header size="small">Opportunities: {opportunities.length}</Header>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image 
                size="medium" 
                inline
                src={logo ? buildImageUrl(logo.url): nologo}
              />
            </Grid.Column>
          </Grid>
          <Header size="small">Location</Header>
          <LocationMap
            name="location"
            onCenterChange={() => console.log('asdf')}
            readOnly
            data={(location && location.point) ? location : { zoom: 10, point: { lat: -27, lng: -65} } }
          />
        </Modal.Content>
      </React.Fragment>
    )
  }
  return null
}

export default View
