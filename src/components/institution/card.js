import React from 'react'
import { Link } from 'react-router-dom'
import { Label, Card, Image, Icon } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'

const InstCard = (props) => {
  const { institution } = props
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

