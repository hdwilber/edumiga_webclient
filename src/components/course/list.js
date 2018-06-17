import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Actions as TableActions } from '../../utils/constants'

export const Actions = {
  EDIT: 1,
  DELETE: 2,
}
export class List extends React.PureComponent {

  shouldComponentUpdate(nextProps) {
    return !(nextProps.items === this.props.items)
  }

  render () {
    const { onClickItem, items, onClickAction } = this.props

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Units</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            items && ( 
            items.map(i => (
              <Table.Row key={i.id} onClick={() => { onClickItem && onClickItem(i)}}>
                <Table.Cell>{i.name}</Table.Cell>
                <Table.Cell>{i.duration}</Table.Cell>
                <Table.Cell>{i.durationUnit}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon="edit" onClick={(e) => {e.stopPropagation(); onClickAction(TableActions.fastEdit, i)}} />
                    <Button icon="remove" onClick={(e) => {e.stopPropagation(); onClickAction(TableActions.delete, i)}} />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            )))
          }
        </Table.Body>


      </Table>
    )
  }
}

export default List;
