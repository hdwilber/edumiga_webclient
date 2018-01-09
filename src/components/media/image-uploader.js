import React from 'react'
import { Image, Form } from 'semantic-ui-react'

class ImageUploader extends React.Component {
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
