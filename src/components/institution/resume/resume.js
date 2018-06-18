import React from 'react'
import { Button, Card, Icon,
  Modal, Grid, Header,
  Image 
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { buildImageUrl } from '../../../redux/utils'
import LocationViewer from '../../../components/location/viewer'
import { nologo } from '../../../utils/constants'
import OppThumbnail from '../../../components/opportunity/thumbnail/thumbnail'
import InstThumbnail from '../thumbnail/thumbnail'
import './styles.scss'

const Resume = props => {
  const { institution } = props

  if(institution) {
    const { 
      prename, 
      name, description, logo, resume: { opportunities, dependencies, stats } } = institution


    function renderTitle() {
      const text = Object.keys(stats.dependencies).map( name => {
        return (
          <span key={name}>
            {name}: {stats.dependencies[name]} &nbsp;
          </span>
        )
      })
      return (
        <Header size="small">
          Dependencies: {text} ({dependencies.length})
        </Header>
      )
    }
    function renderActionButtons() {
      return (
        <Button.Group floated="right" size='medium'>
          <Button 
            primary
            as={Link} 
            to={`/institution/${institution.id}`}
          >
            <Icon name="find"/>
              View
          </Button>
          <Button 
            secondary
            as={Link} 
            to={`/institution/${institution.id}/editor`}
          >
            <Icon name="edit"/>
              Edit
          </Button>
        </Button.Group>
      )
    }
    function prepareLocations() {
      const locations = dependencies.reduce( (acc, dep) => {
        if (dep.location) {
          acc.push({
            point: dep.location.point,
            info: `${dep.prename} ${dep.name}`,
          })
        }
        return acc
      }, [])

      return locations
    }
    const locations = prepareLocations()
    return (
      <React.Fragment>
        <Modal.Content>
          <Grid container>
            <Grid.Column width={16}>
              <Grid>
                <Grid.Column width={4}>
                  <Image 
                    floated="right"
                    size="medium" 
                    inline
                    src={logo ? buildImageUrl(logo.url): nologo}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  { renderActionButtons() }
                  <Header size="tiny">{prename}</Header>
                  <Header size="large">{name}</Header>
                  <p>{description}</p>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  {renderTitle()}
                  <Card.Group itemsPerRow={2}>
                    { dependencies.slice(0,4).map( dep =>(
                        <InstThumbnail key={dep.id} institution={dep}/>)
                      )
                    }
                  </Card.Group>

                </Grid.Column>
                <Grid.Column width={8}>
                  <Header size="small">Opportunities: ({stats.opportunities})</Header>
                  <Card.Group itemsPerRow={2}>
                    { opportunities.slice(0,4).map( opp =>(
                        <OppThumbnail key={opp.id} opportunity={opp}/>)
                      )
                    }
                  </Card.Group>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
          <Header size="small">Location</Header>
          <LocationViewer
            locations={locations}
            main={{...locations[0], zoom: 14}}
          />
        </Modal.Content>
      </React.Fragment>
    )
  }
  return null
}

export default Resume
