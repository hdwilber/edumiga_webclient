import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

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

const FormOverview = (props) => {
  const { constants, onInputChange, onCheckboxChange, data} = props

  if (data && constants) {
    const { types, levels, countries } = formatConstants(constants)
    const selCountry = countries.find(a => a.value === data.country)
    const states = selCountry ? formatArray(selCountry.states) : []
    return (
      <Form>
        <Form.Input value={data.name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />

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

        <Form.Input value={data.address} name="address" onChange={onInputChange} label="Address" type="text"/>

        <Form.Field>
          <label>Description</label>
          <TextArea value={data.description} name="description" 
            onChange={onInputChange} 
          />
        </Form.Field>
        
        <Form.Field>
          <label>Type</label>
          <Select value={data.type} name="type" 
            onChange={onInputChange} 
            options={types}
          />
        </Form.Field>
        
        <Form.Group>
          <label>Levels</label>
          {levels.map ((l, idx) => {
            return (
              <Form.Field>
                <Checkbox key={idx} label={l.text} value={l.value} name="levels" onChange={onCheckboxChange} checked={!!data.levels.find(v => v === l.value)}/>
              </Form.Field>
            )
          })}
        </Form.Group>

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={data.draft} name="draft"
            onChange={onCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default FormOverview

