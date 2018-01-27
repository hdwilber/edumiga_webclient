
import React from 'react'
import { Select, Checkbox, Form } from 'semantic-ui-react'

function formatConstants(constants) {
  const consts = {}
  for(const k in constants) {
    consts[k] = constants[k].map((v, idx) => {
      return {
        ...v,
        key: idx,
        text: v.name,
        value: v.id,
      }
    })
  }
  return consts
}

function formatArray(array) {
  return array.map((a,idx) => {
    return {
      ...a,
      key: idx,
      text: a.name,
      value: a.id,
    }
  })
}

const FormIdentity = (props) => {

  const { constants, onInputChange, data} = props

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

  if (data && constants) {
    const { countries, categories } = formatConstants(constants)
    const selCountry = countries && countries.find(a => a.value === data.country)
    const states = selCountry ? formatArray(selCountry.states) : []

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
          <Form.Field>
            <label>Country</label>
            <Select value={data.country} name="country" 
              onChange={onInputChange} 
              options={countries}
            />
          </Form.Field>

          <Form.Field>
            <label>State</label>
            <Select value={data.state} name="state" 
              onChange={onInputChange} 
              options={states}
            />
          </Form.Field>

          <Form.Input value={data.county} name="county" onChange={onInputChange} 
            label="County" type="text"
          />
        </Form.Group>

        <Form.Group grouped>
          <label>Interests</label>
          {categories && categories.map (l => {
            return (
              <Form.Checkbox
                key={l.key}
                label={l.text} value={l.value} name="interests" 
                onChange={handleCheckboxChange} 
                checked={data.interests ? data.interests.indexOf(l.value) > -1: false}
              />
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

