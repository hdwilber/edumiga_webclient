import React from 'react'
import { Header, Image, Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

class ImageUploader extends React.Component {
  constructor(props){
    super(props)

  }

  render() {
    const { onFileChange, url } = this.props
    return (
      <Form>
        <Form.Input name="profileLogo" onChange={onFileChange} 
          label="Name" type="file"
        />
        {(url instanceof Array) ? (
          url.map((u,idx) => (
            <Image key={idx} src={u} />
          ))
        ) : (
          <Image src={url} />
        )}
      </Form>
    )
  }
}

export default ImageUploader
