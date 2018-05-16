import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, Card, Image, Icon } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'

export const ActionTypes = {
  DELETE: 3,
}

function renderOwnerActions (props) {
  const { institution, onAction } = props
  return (
    <div>
      <Button icon='delete' onClick={(e) => onAction(ActionTypes.DELETE, institution)}>
      </Button> 
    </div>
  )
}
const InstCard = (props) => {
  const { session, institution } = props
  if (institution) {
    return (
      <Card>
        <Card.Content>
          <div>
            { institution.logo 
            ? (<Image size="tiny" 
              floated="right" 
              inline={true} src={buildImageUrl(institution.logo.url)}/>)
              : <Icon name="building" />
            }
          </div>

          <p><b>{institution.type}</b></p>
          <Card.Meta>
            {institution.prename}
            {institution.levels && institution.levels.map((l, index) => <Label key={index}>{l}</Label>)}
          </Card.Meta>
          <Card.Header as={Link} to={`/institution/${institution.id}/edit`}>
            {institution.name}
          </Card.Header>
          <Card.Description>
            {institution.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='list' />
            {institution.opportunities && institution.opportunities.length} Opportunities
          </a>
        </Card.Content>
      </Card>
    )

  } else {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Loading institution...</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}

export default InstCard

