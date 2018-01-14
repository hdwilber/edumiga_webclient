import React from 'react'
import { Button, Image, Form } from 'semantic-ui-react'

const SimpleMediaUploader = (props) => {
  const { name, onChange, onUpload, url, disabled } = props

  function handleFileChange(e) {
    const files = e.target.files
    onChange(e, { 
      name,
      value: {
        file: files[0],
        fakeUrl: URL.createObjectURL(files[0]),
      } 
    })
  }

  return (
    <Form>
      <Form.Input name={name} onChange={handleFileChange} 
        type="file"
      />
        <Image src={url} />
        <Button disabled={disabled} onClick={onUpload}>Upload</Button>
    </Form>
  )
}

export default SimpleMediaUploader

