import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Actions as ActionsTable } from '../../utils/constants'

export const Actions = {
  EDIT: 1,
  REMOVE: 2,
}
const List = (props) => {
  const { onSelectRow, items, onClickAction } = props

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Draft</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
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
              <Table.Cell>{i.draft ? 'Draft': 'Published'}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button onClick={(e) => {e.stopPropagation(); onClickAction(ActionsTable.fastEdit, i)}}>Edit</Button>
                  <Button onClick={(e) => {e.stopPropagation(); onClickAction(ActionsTable.fullEdit, i)}}>Edit</Button>
                  <Button onClick={(e) => {e.stopPropagation(); onClickAction(ActionsTable.delete, i)}}>Remove</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          )))
        }
      </Table.Body>


    </Table>
  )
}

export default List;
