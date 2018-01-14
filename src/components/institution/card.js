import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Header } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'

const InstCard = (props) => {
  const { onSelect, institution } = props
  if (institution) {
    return (
      <Card>
        <Image size="small" wrapped={true} inline={true} src={institution.logo ? buildImageUrl(institution.logo.url): 'none' }/>
        <Card.Content>
          <Card.Header as={Link} to={`/institution/${institution.id}/edit`}>
            {institution.name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {institution.address}
            </span>
          </Card.Meta>
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

