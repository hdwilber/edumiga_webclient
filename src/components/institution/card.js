import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, Card, Image, Icon } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'
import nologo from '../../images/nologo.svg'

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
  const { institution } = props
  if (institution) {
    const { 
      logo, type, prename, name, 
      description, levels, 
      stats } = institution
    return (
      <Card>
        <Card.Content>
          <Image 
            size="tiny" 
            floated="right" 
            inline
            src={logo ? buildImageUrl(logo.url): nologo}
          />

          <p><b>{type}</b></p>
          <Card.Meta>
            {prename}
          </Card.Meta>
          <Card.Header as={Link} to={`/institution/${institution.id}/edit`}>
            {name}
          </Card.Header>
          <Card.Description>
            <p>
              {description}
            </p>
            <Label.Group>
              {levels && levels.map((l, index) => <Label key={index} content={l} /> )}
            </Label.Group>

          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { stats && (
            <React.Fragment>
              <a>
                <Icon name='building' />
                {stats.dependencies} Dependencies
              </a>
              <a>
                <Icon name='list' />
                {stats.opportunities} Opportunities
              </a>
            </React.Fragment>
          )}
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

