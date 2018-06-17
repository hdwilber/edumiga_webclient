import React from 'react'
import { Image, Form } from 'semantic-ui-react'
import { nologo } from '../../utils/constants'

class InputImage extends React.PureComponent {
  
  handleFileChange = (e) => {
    const { name, onChange } = this.props
    const files = e.target.files
    onChange(e, {
      name,
      value: {
        file: files[0],
        fakeUrl: URL.createObjectURL(files[0]),
      }
    })
  }

  render() {
    const { name, value: { url, fakeUrl}, onChange } = this.props
    const imgSrc = fakeUrl || url
    return (
      <Form>
        <Form.Input name={name} onChange={this.handleFileChange} 
          type="file"
        />
        <Image src={imgSrc ? imgSrc: nologo} />
      </Form>
    )
  }
}

export default InputImage
