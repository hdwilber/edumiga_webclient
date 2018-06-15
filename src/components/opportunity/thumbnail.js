import React from 'react'
import { Header, Label, Card, Image } from 'semantic-ui-react'

import { buildImageUrl } from '../../redux/utils'
import nologo from '../../images/nologo.svg'

export const ActionTypes = {
  DELETE: 3,
}
const Thumbnail = (props) => {
  const { opportunity, onClick } = props
  if (opportunity) {
    const { 
      logo, type, name, 
      degrees,
    } = opportunity
    return (
      <Card onClick={onClick}>
        <Card.Content>
          <Image 
            size="mini" 
            inline
            floated="right"
            src={logo ? buildImageUrl(logo.url): nologo}
          />
          <Header size="tiny">{name}</Header>
          <Card.Description>
            <p><b>{type}</b></p>
            <Label.Group>
              {degrees && degrees.map(d => <Label key={d} content={d} /> )}
            </Label.Group>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
      </Card>
    )
  } else {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Loading Opportunity...</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}

export default Thumbnail

