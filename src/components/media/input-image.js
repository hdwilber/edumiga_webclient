import React from 'react'
import { Image, Form } from 'semantic-ui-react'
import { nologo } from '../../utils/constants'

const InputImage = (props) => {
  const { name, value: { url, fakeUrl}, onChange } = props

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
  const imgSrc = fakeUrl || url
  return (
    <Form>
      <Form.Input name={name} onChange={handleFileChange} 
        type="file"
      />
      <Image src={imgSrc ? imgSrc: nologo} />
    </Form>
  )
}

export default InputImage
