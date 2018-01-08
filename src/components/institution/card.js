import React from 'react'
import { Header, Image, Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

const InstCard = (props) => {
  const { onSelect, institution } = props
  return (
    <div onClick={(e) => onSelect(institution) }>
      <Header content={institution.name} size="large" />
      <p>{institution.description}</p>
    </div>
  )
}

export default InstCard

