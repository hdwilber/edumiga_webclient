import React from 'react'
import { Icon, Button, Dropdown, Image, Menu } from 'semantic-ui-react'

const logo = require('../images/edumiga-logo.png')

const Items = {
  UNDEFINED: 0,
  INSTITUTION: 1,
  OPPORTUNITY: 2,
  USER: 3,
}

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: Items.UNDEFINED
    }

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, {index}) {
    this.setState({
      activeItem: index,
    })
  }

  render() {
    const { activeItem } = this.state
    const { onLogout, account } = this.props

    return (
      <Menu>
        <Menu.Item>
          <Image src={logo} width="100" />
        </Menu.Item>
        <Menu.Item index={Items.INSTITUTION} active={activeItem === Items.INSTITUTION} onClick={this.handleItemClick}>
          Institutions
        </Menu.Item>
        <Menu.Item index={Items.OPPORTUNITY} active={activeItem === Items.OPPORTUNITY} onClick={this.handleItemClick}>
          Opportunities
        </Menu.Item>

        {(account && account.session) ? <MenuItemUser onLogout={onLogout} account={account}/> : (
          <Menu.Item position="right">
            <Button><Icon name="sign in" /> Login</Button>
          </Menu.Item>
        )}
      </Menu>
    )
  }
}

const MenuItemUser = (props) => {
  const { account, onLogout } = props
  return (
    <Menu.Item as={Dropdown} item 
      text={account.session.email}
      position="right"
    >
      <Dropdown.Menu>
        <Dropdown.Item icon='edit' text='Edit Profile' />
        <Dropdown.Item icon='settings' text='Account Settings' />
        <Dropdown.Item icon='sign out' text='Logout' onClick={(e) => onLogout()}/>
      </Dropdown.Menu>
    </Menu.Item>
  )
}

export default Navbar
