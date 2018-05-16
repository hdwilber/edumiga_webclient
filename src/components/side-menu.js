import React from 'react'
import { Button, Dropdown, Menu, Input, } from 'semantic-ui-react'

class SideMenu extends React.Component {

  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.state = {
      activeItem: null
    }
  }

  handleItemClick(e, props) {
    console.log(e)
    console.log(props)
  }
  render() {
    const { activeItem } = this.state
    const options = [{
      value: 0,
      text: 'Institutions',
      key: 1,
    },
    {
      value: 1,
      text: 'Opportunities',
      key: 2,
    },
    {
      value: 1,
      text: 'Dependencies',
      key: 3,
    },
    ]
    return (
      <Menu vertical fluid>
        <Menu.Item>
          <Input fluid
          >
            <input />
            <Dropdown button basic floating options={options} defaultValue='page' />
            <Button type="submit" icon="search"/>
          </Input>
        </Menu.Item>

        <Menu.Item name='filter' active={activeItem === 'filter'} onClick={this.handleItemClick}>
          Filter by
        </Menu.Item>
      </Menu>
    )
  }
}

export default SideMenu

