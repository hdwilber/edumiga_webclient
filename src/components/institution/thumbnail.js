import React from 'react'
import { Header, Button, Label, Card, Image, Icon } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'
import nologo from '../../images/nologo.svg'

export const ActionTypes = {
  DELETE: 3,
}
const Thumbnail = (props) => {
  const { institution, onClick } = props
  if (institution) {
    const { 
      logo, type, prename, name, 
      adminLevel,
      description, levels, 
      stats } = institution
    return (
      <Card onClick={onClick}>
        <Card.Content>
          <Label size="mini" ribbon content={adminLevel} />
          <Image 
            size="mini" 
            inline
            floated="right"
            src={logo ? buildImageUrl(logo.url): nologo}
          />
          <Header size="mini">{prename}{name}</Header>
          <Card.Description>
            <p><b>{type}</b></p>
            <Label.Group>
              {levels && levels.map((l, index) => <Label key={index} content={l} /> )}
            </Label.Group>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { stats && (
            <p>
              <Icon name='building' />
              {stats.dependencies} Dependencies
              <Icon name='list' />
              {stats.opportunities} Opportunities
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

export default Thumbnail

