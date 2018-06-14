import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'
import TreeView from '../dropdown-treeview/dropdown-treeview'

class FormOverview extends React.Component {
  constructor(props) {
    super(props)
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(e, props) {
    const { onInputChange } = this.props
    if (props.name === 'levels'){
      const target = this.props.data[props.name]
      if (props.checked) {
        onInputChange(e, {name: props.name, value: target.concat([props.value])})
      } else {
        onInputChange(e, {name: props.name, value: target.filter(v => v !== props.value)})
      } 
    } else {
      onInputChange(e, {name: props.name, value: props.checked})
    }
  }

  prepareNode(node, main = true) {
    //const children = node.children.map(n => prepareNode(n)
    return {
      data: {
        value: node.id,
        text: node.name,
      },
      main,
      children: node.children.map(n => this.prepareNode(n, false)),
      visible: true,
      collapsed: true,
      selectable: true,
    }
  }
  prepareCategoryList(list) {
    if (list) {
      const newList = list.map( cat => {
        return this.prepareNode(cat)
      })
      return newList
    }
    return []
  }

  render() {
    const { categoryList, constants, onInputChange, data} = this.props
    if (data && constants) {
      const { types, levels, countries, adminLevels } = constants
      const selCountry = countries && countries.find(a => a.value === data.country)
      const states = selCountry ? selCountry.states : []
      return (
        <Form>
          <Form.Group widths="equal">
            <Form.Input value={data.prename} name="prename" onChange={onInputChange} 
              label="Pre name" type="text"
            />
            <Form.Input value={data.name} name="name" onChange={onInputChange} 
              label="Name" type="text"
            />
          </Form.Group>

          <Form.Group widths="equal">
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
            <label>Categories</label>
            <TreeView value={data.categories} name="categories"
              nodes={this.prepareCategoryList(categoryList)}
              onChange={onInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <TextArea value={data.description} name="description" 
              onChange={onInputChange} 
            />
          </Form.Field>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Type</label>
              <Select value={data.type} name="type" 
                onChange={onInputChange} 
                options={types}
              />
            </Form.Field>
            <Form.Field>
              <label>Administrative Level</label>
              <Select value={data.adminLevel} name="adminLevel" 
                onChange={onInputChange} 
                options={adminLevels}
              />
            </Form.Field>
          </Form.Group>


          <Form.Group>
            <label>Levels</label>
            {levels.map ((l, idx) => {
              return (
                <Form.Field key={idx} >
                  <Checkbox label={l.text} value={l.value} name="levels" onChange={this.handleCheckboxChange} checked={!!data.levels.find(v => v === l.value)}/>
                </Form.Field>
              )
            })}
          </Form.Group>

          <Form.Field>
            <Checkbox label="Make it visible?" checked={data.published} name="published"
              onChange={this.handleCheckboxChange}
            />
          </Form.Field>
        </Form>
      )
    } else {
    return <h1>Loading...</h1>
    }
  }
}

export default FormOverview

