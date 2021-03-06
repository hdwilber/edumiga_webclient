import React from 'react'
import { Header, Label, Card } from 'semantic-ui-react'

const Thumbnail = (props) => {
  const { institution, onClick } = props

  if (institution) {
    const { 
      type, prename, name, 
      levels, 
    } = institution
    return (
      <Card onClick={onClick}>
        <Card.Content>
          <Card.Description>
            <Header size="tiny">{`${prename} ${name}`}</Header>
            <p><b>{type}</b></p>
            <Label.Group>
              {levels && levels.map((l, index) => <Label key={index} content={l} /> )}
            </Label.Group>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Thumbnail

