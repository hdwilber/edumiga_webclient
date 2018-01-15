import React from 'react'
import { Button, Table } from 'semantic-ui-react'

export const Actions = {
  EDIT: 1,
  DELETE: 2,
}
const List = (props) => {
  const { onClickItem, items, onClickAction } = props

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Units</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          items && ( 
          items.map(i => (
            <Table.Row key={i.id} onClick={() => onClickItem(i)}>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.description}</Table.Cell>
              <Table.Cell>{i.duration}</Table.Cell>
              <Table.Cell>{i.durationUnit}</Table.Cell>
              <Table.Cell>
                <Button onClick={(e) => {e.stopPropagation(); onClickAction(Actions.EDIT, i)}}>Edit</Button>
                <Button onClick={(e) => {e.stopPropagation(); onClickAction(Actions.DELETE, i)}}>Remove</Button>
              </Table.Cell>
            </Table.Row>
          )))
        }
      </Table.Body>


    </Table>
  )
}

export default List;
