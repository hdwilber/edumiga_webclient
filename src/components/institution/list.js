import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Actions as TableActions } from '../../utils/constants'

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
          <Table.HeaderCell>Administrative Level</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          items && ( 
          items.map(i => (
            <Table.Row key={i.id} onClick={() => onSelectRow(i)}>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.adminLevel}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button icon="external" compact onClick={(e) => {e.stopPropagation(); onClickAction(TableActions.fullEdit, i)}} />
                  <Button icon="edit" compact onClick={(e) => {e.stopPropagation(); onClickAction(TableActions.fastEdit, i)}} />
                  <Button icon="remove" compact onClick={(e) => {e.stopPropagation(); onClickAction(TableActions.delete, i)}} />
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
