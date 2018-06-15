import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './styles.scss'

const logo = require('../../images/edumiga-logo.png')

const MainLogo = () => {
  return (
    <div className="edumiga-main-logo">
      <Image as={Link} to="/" src={logo} />
    </div>
  )
}


export default MainLogo
