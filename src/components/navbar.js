import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Button, Dropdown, Image, Menu } from 'semantic-ui-react'

import { buildImageUrl } from '../redux/utils'

const logo = require('../images/edumiga-logo.png')

const Items = {
  UNDEFINED: 0,
  INSTITUTION: 1,
  OPPORTUNITY: 2,
  USER: 3,
}

class Navbar extends React.Component {
  render() {
    const { onClickLogin, onLogout, account } = this.props

    return (
      <Menu fluid>
        <Menu.Item>
          <Image as={Link} to="/" src={logo} width="100" />
        </Menu.Item>
        <Menu.Item as={Dropdown} item index={Items.INSTITUTION} 
          text="Institutions"
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/institution/create"><Icon name="edit"/>Create</Dropdown.Item>
            <Dropdown.Item as={Link} to="/institutions"><Icon name="list"/>List</Dropdown.Item>
          </Dropdown.Menu>
        </Menu.Item>

        <Menu.Item index={Items.OPPORTUNITY} >
          Opportunities
        </Menu.Item>

        <MenuItemUser onClickLogin={onClickLogin} onLogout={onLogout} account={account}/> 
      </Menu>
    )
  }
}

const MenuItemUser = (props) => {
  const { account: { current, identity }, onLogout, onClickLogin } = props


  function renderTrigger() {
    return (
      <span>
        { (identity && identity.photo) ? <Image avatar src={buildImageUrl(identity.photo.url)}/> : <Icon name="user circle"/> }
        { (identity && identity.displayName === '') ? (current || current.email): (identity.displayName) }
      </span>
    )

  }

  if (identity) {
    return (
      <Menu.Menu
        position="right"
      >
      <Dropdown item
        trigger={renderTrigger()}
        labeled 
      >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/account/identity" icon='edit' text='Edit Profile' />
            <Dropdown.Item as={Link} to="/institutions?owned=me" icon='list' text='My Institutions' />
            <Dropdown.Item icon='settings' text='Account Settings' />
            <Dropdown.Item icon='sign out' text='Logout' onClick={(e) => onLogout()}/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )
  } else {
    return (
      <Menu.Item
        position="right"
        onClick={onClickLogin}
      >
        <Button><Icon name="sign in" /> Login</Button>
      </Menu.Item>
    )
  }
}

export default Navbar
