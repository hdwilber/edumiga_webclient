import React from 'react'
import { Label, Card, Image, Icon } from 'semantic-ui-react'

import { buildImageUrl } from '../../utils/image-url'
import nologo from '../../images/nologo.svg'

export const ActionTypes = {
  DELETE: 3,
}

const InstCard = (props) => {
  const { institution, onClick } = props
  if (institution) {
    const { 
      logo, type, prename, name, 
      description, levels, 
      resume = {}} = institution
    return (
      <Card onClick={onClick}>
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
          <Card.Header>
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
          { resume.stats && (
            <p>
              <Icon name='building' />
              {resume.dependencies.length} Dependencies
              <Icon name='list' />
              {resume.stats.opportunities} Opportunities
            </p>
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

