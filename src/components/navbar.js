import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Input, Button, Dropdown, Image, Menu } from 'semantic-ui-react'

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
    const searchOptions = [
      {key: 'institutions', text: 'Institutions', value: 'institutions',},
      {key: 'opportunities', text: 'Opportunities', value: 'opportunities',},
      {key: 'courses', text: 'Courses', value: 'courses'},
    ]

    return (
      <Menu fluid>
        <Menu.Item>
          <Image as={Link} to="/" src={logo} width="100" />
        </Menu.Item>
        <Menu.Item as={Dropdown} item index={Items.INSTITUTION} 
          text="Quick Catalog"
        >

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/institutions"><Icon name="edit"/>Institutions</Dropdown.Item>
            <Dropdown.Item as={Link} to="/opportunities"><Icon name="edit"/>Opportunities</Dropdown.Item>
            <Dropdown.Item as={Link} to="/courses"><Icon name="edit"/>Courses</Dropdown.Item>
            <Dropdown.Item as={Link} to="/institutions"><Icon name="list"/>Technology</Dropdown.Item>
            <Dropdown.Item as={Link} to="/institutions"><Icon name="list"/>Health and Medical Sciences</Dropdown.Item>
          </Dropdown.Menu>
        </Menu.Item>

        <Menu.Item index={Items.OPPORTUNITY} style={{borderRight: 'none', flexGrow: 1}}>
          <Input placeholder='Search to...'
            label={<Dropdown defaultValue="institutions" options={searchOptions}
            />
            }
            action={<Button icon="search" />}
          />

        </Menu.Item>

        <Menu.Item as={Dropdown} item
          text="Quick Menu"
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/institution/create"><Icon name="edit"/>Create Institution</Dropdown.Item>
          </Dropdown.Menu>
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
