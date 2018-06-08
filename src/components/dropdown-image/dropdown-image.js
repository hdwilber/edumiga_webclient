import React from 'react'
import { Menu, Icon, Image, Button, Dropdown } from 'semantic-ui-react'
import './styles.scss'

const DropdownImage = ({icon, src, label,children, ...rest}) => {
  function renderTrigger() {
    return (
      <div
        className={`edumiga-dropdownimage-trigger ${!!src && 'displace-right'}`}
      >
        { !src && icon && <Icon name={icon} /> }
        { src && <Image avatar src={src} className="edumiga-dropdownimage-img"/> }
        { label }
      </div>
    )
  }
  return (
    <Dropdown item
      className="edumiga-dropdownimage"
      trigger={renderTrigger()}
      {...rest}
    >
      <Dropdown.Menu>
        { React.Children.map(children, ch => ch)}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownImage

