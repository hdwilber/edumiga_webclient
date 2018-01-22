import React from 'react'
import { Header, } from 'semantic-ui-react'

const TypesOptions = [
  {
    key: 1,
    text: 'Public',
    value: 'public',
  },
  {
    key: 2,
    text: 'Private',
    value: 'private',
  },
  {
    key: 3,
    text: 'Mixed',
    value: 'mixed',
  },
  {
    key: 4,
    text: 'Other',
    value: 'other',
  },
]

const LevelsOptions = [
  {
    key: 1,
    text: 'Elementary',
    value: 'elementary',
  },
  {
    key: 2,
    text: 'High School',
    value: 'highschool',
  },
  {
    key: 3,
    text: 'Bachelor',
    value: 'bachelor',
  },
  {
    key: 4,
    text: 'Master of Science',
    value: 'master',
  },
]

const Overview = (props) => {
  const { data } = props
  if (data) {
    const type = TypesOptions.find(a => a.value === data.type)
    const levels = LevelsOptions.filter(l => !!data.levels.find(lf => lf=== l.value))
    return (
      <div>
        <Header size="normal">{data.name}</Header>
        <Header.Subheader>{`${data.country} / ${data.state} / ${data.county}`}</Header.Subheader>
        <p>Adress:{data.address}</p>
        <p>{data.description}</p>
        <Header>{type && type.text}</Header>
        <Header>{type && type.text}</Header>
          
        <label>Levels</label>
        {levels.map (l => {
          return (
            <p>
              {l.value}
            </p>
          )
        })}
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default Overview

