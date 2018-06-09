import React from 'react'
import { Icon, Label, Modal, Grid, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { buildImageUrl } from '../../redux/utils'
import LocationMap from '../../components/location/map'
import { nologo } from '../../utils/constants'

const Resume = props => {
  const { institution, headerComponent, contentComponent} = props

  if(institution) {
    const { 
      prename, 
      name, description, location, logo, resume: { dependencies, stats } } = institution

    return (
      <React.Fragment>
        <Modal.Content>
          <Grid container>
            <Label 
              as={Link}
              to={`/institution/${institution.id}`}
              corner="left" icon={<Icon name="find"/>} size="massive" 
              color="red"
            />
            <Grid.Column width={12}>
              <Header size="tiny">{prename}</Header>
              <Header size="large">{name}</Header>
              <p>{description}</p>
              <Grid>
                <Grid.Column width={8}>
                  <Header size="small">Dependencies(dependencies.length): 
                    <ul>
                      { Object.keys(stats.dependencies).map( name => {
                        return <li key={name}>{name}: {stats.dependencies[name]}</li>
                        })
                      }
                    </ul>
                  </Header>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header size="small">Opportunities: {stats.opportunities}</Header>
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

export default Resume
