import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import InputTreeview from '../input-treeview/input-treeview'

class InputInstitution extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showInstList: false,
    }
  }

  prepareNode(node, main = true) {
    return {
      data: {
        value: node.id,
        text: `${node.prename} ${node.name}`,
        ref: node,
      },
      main,
      children: node.children ? node.children.map(n => this.prepareNode(n, false)): [],
      visible: true,
      collapsed: true,
      selectable: true,
    }
  }

  formatInstitutions(list) {
    if (list) {
      const newList = list.map(inst => {
        return this.prepareNode(inst)
      })
      return newList
    }
    return []
  }

  renderContent() {
    const { value, unselected, } = this.props
    if(value) {
      return (<Link to={`/institution/${value.value}/editor`}>{value.text}</Link>)
    }
    return (
      <p>
        {unselected}
      </p>
    )
  }

  handleToggle = () => {
    this.setState({
      showInstList: !this.state.showInstList,
    })
  }
  renderActionButton() {
    const { value } = this.props
    return <Button onClick={this.handleToggle} basic>{ value ? 'Change': 'Link' }</Button>
  }

  handleChange = (event, props) => {
    const { name, onChange } = this.props
    this.setState({
      showInstList: false,
    })
    onChange({}, { name, value: props.value })
  }

  renderInstList() {
    const { showInstList } = this.state
    const { value, institutions } = this.props

    return showInstList && (
      <InputTreeview 
        nodes={this.formatInstitutions(institutions)} 
        onChange={this.handleChange}
        name="institution"
        value={value}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderContent() }
        { this.renderActionButton() }
        { this.renderInstList() }
      </React.Fragment>
    )
  }
}

export default InputInstitution
