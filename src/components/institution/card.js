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
          <Image size="tiny" floated="right" wrapped={true} inline={true} src={institution.logo ? buildImageUrl(institution.logo.url): 'none' }/>
          <p><b>{institution.type}</b></p>
          <Card.Meta>
            {institution.prename}
          </Card.Meta>
          <Card.Header as={Link} to={`/institution/${institution.id}/edit`}>
            {institution.name}
          </Card.Header>
          <Card.Description>
            {institution.description}
            <p>
            {institution.levels && institution.levels.map(l => <Label>{l}</Label>)}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='list' />
            {institution.opportunities && institution.opportunities.length} Opportunities
          </a>
          { session.accountId === institution.accountId && renderOwnerActions(props)}
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

