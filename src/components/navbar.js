import React from 'react'
import { Link } from 'react-router-dom'
import { Responsive, Icon, Button, Dropdown } from 'semantic-ui-react'
import MainLogo from '../components/navbar/main-logo'
import './styles.scss'

import { buildImageUrl } from '../utils/image-url'
import DropdownImage from './dropdown-image/dropdown-image'

class Navbar extends React.Component {

  render() {
    const { onClickLogin, onLogout, account } = this.props

    return (
      <div className="ui menu edumiga-navbar">
        <MainLogo />
        <div className="edumiga-navbar-menu">
          <DropdownImage
            icon="book" label={hideOnMobile('Quick Catalog')}
          >
              <Dropdown.Item as={Link} to="/institutions"><Icon name="edit"/>Institutions</Dropdown.Item>
              <Dropdown.Item as={Link} to="/opportunities"><Icon name="edit"/>Opportunities</Dropdown.Item>
              <Dropdown.Item as={Link} to="/courses"><Icon name="edit"/>Courses</Dropdown.Item>
              <Dropdown.Item as={Link} to="/institutions"><Icon name="list"/>Technology</Dropdown.Item>
              <Dropdown.Item as={Link} to="/institutions"><Icon name="list"/>Health and Medical Sciences</Dropdown.Item>
          </DropdownImage>

          <DropdownImage 
            icon="th"
            label={hideOnMobile('Quick Menu')}
          >
              <Dropdown.Item as={Link} to="/institution/create"><Icon name="edit"/>Create Institution</Dropdown.Item>
          </DropdownImage>
        </div>
        <div className="edumiga-navbar-right">
          <MenuItemUser onClickLogin={onClickLogin} onLogout={onLogout} account={account}/> 
        </div>
      </div>
    )
  }
}

const hideOnMobile = (content) => (<Responsive as="span" minWidth={Responsive.onlyTablet.minWidth}>{content}</Responsive>)

const MenuItemUser = (props) => {
  const { account: { current, identity }, onLogout, onClickLogin } = props

  if (identity) {
    const { photo, displayName } = identity
    const imageUrl = photo && buildImageUrl(identity.photo.url)
    const label = hideOnMobile(displayName || current.email)

    return (
      <DropdownImage
        icon={imageUrl || 'user circle'}
        src={imageUrl}
        label={label}
      >
          <Dropdown.Item as={Link} to="/account/identity" icon='edit' text="Edit Profile"/>
          <Dropdown.Item as={Link} to="/institutions?owned=me" icon='list' text='My Institutions' />
          <Dropdown.Item icon='settings' text='Account Settings' />
          <Dropdown.Item icon='sign out' text='Logout' onClick={(e) => onLogout()}/>
      </DropdownImage>
    )
  } else {
    return (
      <Button onClick={onClickLogin}><Icon name="sign in" />{hideOnMobile('Login')}</Button>
    )
  }
}

export default Navbar
