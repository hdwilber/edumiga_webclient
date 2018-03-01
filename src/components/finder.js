import React from 'react'
import { Form, Search, Button } from 'semantic-ui-react'

class Finder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: '',
      area: '',
      level: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleResultClick = this.handleResultClick.bind(this)
  }

  handleChange(e, {name, value}) {
    console.log('Search change')
    console.log(name)
    console.log(value)
  }

  handleResultClick(e, {name, value}) {
    console.loG('Rsult click')
    console.log(name)
    console.log(value)
  }

  handleClick(e) {
    const { onSearch }  = this.props
    const { place, area, level } = this.state
    onSearch({
      place, area, level,
    })
  }

  render() {
    const { place, area, level } = this.props

    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Where?</label>
            <Search
              onSearchChange={this.handleChange}
              onResultSelect={this.handleResultClick}
              name="place" icon=""
              value={place} placeholder='Where to find?' />
          </Form.Field>
          <Form.Field>
            <label>Areas?</label>
            <Search
              value={area}
              onSearchChange={this.handleChange}
              onResultSelect={this.handleResultClick}
              name="area" icon=""
              placeholder='Categories to find?' />
          </Form.Field>
          <Form.Field>
            <label>Type</label>
            <Search
              name="level"
              onSearchChange={this.handleChange}
              onResultSelect={this.handleResultClick}
              value={level} icon=""
              placeholder='Type of education to find?' />
          </Form.Field>
          <Button onClick={this.handleClick} type='submit'>Search</Button>
        </Form.Group>
      </Form>
    )
  }
}
export default Finder
