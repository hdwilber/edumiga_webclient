import React from 'react'
import { Table } from 'semantic-ui-react'

const List = (props) => {
  const { onSelectRow, items } = props
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Draft</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          items && ( 
          items.map(i => (
            <Table.Row key={i.id} onClick={() => onSelectRow(i)}>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.description}</Table.Cell>
              <Table.Cell>{i.duration}</Table.Cell>
              <Table.Cell>{i.draft}</Table.Cell>
            </Table.Row>
          )))
        }
      </Table.Body>


    </Table>
  )
}

export default List;
