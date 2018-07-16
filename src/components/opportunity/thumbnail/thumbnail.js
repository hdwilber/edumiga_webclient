import React from 'react'
import { Header, Label, Card, Image } from 'semantic-ui-react'

import { buildImageUrl } from '../../../utils/image-url'
import nologo from '../../../images/nologo.svg'
import './styles.scss'

export const ActionTypes = {
  DELETE: 3,
}
const Thumbnail = (props) => {
  const { opportunity, onClick } = props
  if (opportunity) {
    const { 
      logo, name, 
      degrees,
    } = opportunity
    return (
      <Card onClick={onClick}>
        <Card.Content>
          <Card.Description>
            <Header size="tiny">{name}</Header>
            <Label.Group>
              {degrees && degrees.map(d => <Label key={d} content={d} /> )}
            </Label.Group>
            <Image 
              centered
              size="mini" 
              inline
              src={logo ? buildImageUrl(logo.url): nologo}
            />
          </Card.Description>
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
