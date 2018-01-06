import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from './containers'

console.log(Home)
function Routes(props) {
  const { Wrapper } = props
  return (
    <Wrapper>
      <Route exact path="/" component={ Home } />
    </Wrapper>
  )
}

export default Routes
