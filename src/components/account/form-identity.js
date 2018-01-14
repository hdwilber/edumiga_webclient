
import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

const InterestsOptions = [
  {
    key: 1,
    text: 'Everything and all',
    value: 'all',
  },
  {
    key: 2,
    text: 'Art',
    value: 'art',
  },
  {
    key: 3,
    text: 'Technology',
    value: 'technology',
  },
  {
    key: 4,
    text: 'Science',
    value: 'science',
  },
  {
    key: 4,
    text: 'Undergraduate',
    value: 'undergraduate',
  },
  {
    key: 4,
    text: 'Specializations',
    value: 'specialization',
  },
  {
    key: 4,
    text: 'Mastering',
    value: 'mastering',
  },
  {
    key: 4,
    text: 'Highschool',
    value: 'highschool',
  },
]

const FormIdentity = (props) => {

  const { onInputChange, onCheckboxChange, data} = props

  function handleCheckboxChange(e, aprops) {
    if (aprops.name === 'interests'){
      if (aprops.checked) {
        const values = data[aprops.name].concat([aprops.value])
        onInputChange(e, {
          name: aprops.name,
          value: values,
        })

      } else {
        const values = data[aprops.name].filter(v => v !== aprops.value)
        onInputChange(e, {
          name: aprops.name,
          value: values
        })
      }
    } else {
      onInputChange(e, {
        name: aprops.name,
        value: aprops.checked
      })
    }
  }

  if (data) {
    return (
      <Form>
        <Form.Input value={data.displayName} name="displayName" onChange={onInputChange} 
          label="Display name" type="text"
        />
        <Form.Group width="equals">
          <Form.Input value={data.title} name="title" onChange={onInputChange} 
            label="Title" type="text"
          />
          <Form.Input value={data.firstName} name="firstName" onChange={onInputChange} 
            label="First name" type="text"
          />

          <Form.Input value={data.lastName} name="lastName" onChange={onInputChange} 
            label="Last name" type="text"
          />
        </Form.Group>

        <Form.Group width="equals">
          <Form.Input value={data.occupation} name="occupation" onChange={onInputChange} 
            label="Occupation" type="text"
          />
          <Form.Input value={data.phone} name="phone" onChange={onInputChange} 
            label="Phone" type="text"
          />
          <Form.Input value={data.address} name="address" onChange={onInputChange} 
            label="Address" type="text"
          />
        </Form.Group>

        <Form.Group width="equals">
          <Form.Input value={data.country} name="country" onChange={onInputChange} 
            label="Country" type="text"
          />
          <Form.Input value={data.state} name="state" onChange={onInputChange} 
            label="State" type="text"
          />
          <Form.Input value={data.county} name="county" onChange={onInputChange} 
            label="County" type="text"
          />
        </Form.Group>

        <Form.Group width="equals">
        </Form.Group>


        <Form.Group grouped>
          <label>Interests</label>
          {InterestsOptions.map (l => {
            return (
              <Form.Field>
                <Checkbox label={l.text} value={l.value} name="interests" 
                  onChange={handleCheckboxChange} 
                  checked={data.interests ? data.interests.indexOf(l.value) > -1: false}
                />
              </Form.Field>
            )
          })}
        </Form.Group>

        <Form.Field>
          <Checkbox label="Make me visible" checked={data.draft} name="visible"
            onChange={handleCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default FormIdentity

