import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'
import InputTreeview from '../input-treeview/input-treeview'
import InputLocation from '../location/input-location'

class FormGeneral extends React.PureComponent {

  handleCheckboxChange = (e, props) => {
    const { onChange } = this.props

    if (props.name === 'levels'){
      const target = this.props.value[props.name]
      if (props.checked) {
        onChange(e, {name: props.name, value: target.concat([props.value])})
      } else {
        onChange(e, {name: props.name, value: target.filter(v => v !== props.value)})
      } 
    } else {
      onChange(e, {name: props.name, value: props.checked})
    }
  }

  prepareNode(node, main = true) {
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

  formatCategories(list) {
    if (list) {
      const newList = list.map( cat => {
        return this.prepareNode(cat)
      })
      return newList
    }
    return []
  }

  renderLevels() {
    const { value, constants: { levels = [] } } = this.props
    return (
      <Form.Group>
        <label>Levels</label>
        {levels.map ((l, idx) => {
          return (
            <Form.Field key={idx} >
              <Checkbox label={l.text} value={l.value} name="levels" onChange={this.handleCheckboxChange} checked={!!value.levels.find(v => v === l.value)}/>
            </Form.Field>
          )
        })}
      </Form.Group>
    )
  }

  render() {
    const { onChange, 
      value: { 
        description, categories, adminLevel, 
        type, location, address, prename, name, 
        country, state, county,
        published,
      },
      constants,
    } = this.props
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input value={prename} name="prename" onChange={onChange}
            label="Pre name" type="text"
          />
          <Form.Input value={name} name="name" onChange={onChange}
            label="Name" type="text"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Country</label>
            <Select value={country} name="country" 
              onChange={onChange} 
              options={[]}
            />
          </Form.Field>

          <Form.Field>
            <label>State</label>
            <Select value={state} name="state" 
              onChange={onChange} 
              options={[]}
            />
          </Form.Field>

          <Form.Input value={county} name="county" onChange={onChange} 
            label="County" type="text"
          />
        </Form.Group>

        <Form.Input value={address} name="address" onChange={onChange} label="Address" type="text"/>

        <Form.Field>
          <label>Location</label>
          <InputLocation
            name="location"
            onChange={onChange}
            value={location}
          />
        </Form.Field>

        <Form.Field>
          <label>Categories</label>
          <InputTreeview 
            multiple
            value={categories} 
            name="categories"
            nodes={this.formatCategories(constants.categories || [])}
            onChange={onChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <TextArea value={description} name="description" 
            onChange={onChange} 
          />
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Type</label>
            <Select value={type} name="type" 
              onChange={onChange} 
              options={constants.types || []}
            />
          </Form.Field>
          <Form.Field>
            <label>Administrative Level</label>
            <Select value={adminLevel} name="adminLevel" 
              onChange={onChange} 
              options={constants.adminLevels || []}
            />
          </Form.Field>
        </Form.Group>
        { this.renderLevels() }

        <Form.Field>
          <Checkbox label="Make it visible?" checked={published} name="published"
            onChange={this.handleCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default FormGeneral
