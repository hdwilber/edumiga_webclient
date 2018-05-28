import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import { buildImageUrl } from '../../redux/utils'
import LocationMap from '../../components/location/map'
import { nologo } from '../../utils/constants'

const View = props => {
  const { institution } = props

  if(institution) {
    console.log(institution)
    const { prename, name, description, location, logo } = institution
    return (
      <Grid container>
        <Grid.Column width={16}>
          <Grid>
            <Grid.Column width={10}>
                <Header size="tiny">{prename}</Header>
                <Header size="large">{name}</Header>
                <p>{description}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Image 
                size="medium" 
                inline
                src={logo ? buildImageUrl(logo.url): nologo}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Header size="small">Location</Header>
              <LocationMap
                name="location"
                onCenterChange={() => console.log('asdf')}
                readOnly
                data={(location && location.point) ? location : { point: { lat: -27, lng: -65} } }
              />
              <Header size="small">Dependencies</Header>
              <Header size="small">Opportunities</Header>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
  return null
}

export default View
