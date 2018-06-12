import React from 'react'
import { Input, Button, Label } from 'semantic-ui-react'
import './styles.scss'

class Node extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleToggleCollapse = this.handleToggleCollapse.bind(this)
    this.state = {
      collapsed: true,
      visible: true,
      selectable: true,
    }
  }

  handleToggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    const {
      data,
      onClick,
      selectable,
      children,
    } = this.props

    const {
      collapsed,
      visible,
    } = this.state

    return (
      <div className="edumiga-treeview-node">
        { (children && children.length > 0) && (
          <Button color="orange" size="mini" onClick={this.handleToggleCollapse}>
            {collapsed ? '+': '-'}
          </Button>
        )}
        <Label
          onClick={selectable && (() => onClick(data))}
        >
          {data.text}
        </Label>
        {!collapsed && children && children.map(child => <Node {...child} onClick={onClick} />)}
      </div>
    )
  }
}


class Treeview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selections: [] 
    }
  }
  componentDidMount() {
    console.log(this.props.nodes)
  }
  handleClick = (e) => {
    this.setState({
      selections: this.state.selections.concat([e]),
    })
    
  }

  handleToggleCollapse = (node) => {
    node.collapsed = !node.collapsed
    this.forceUpdate()
  }

  render() {
    const { nodes } = this.props
    const { selections } = this.state
    return (
      <div className="edumiga-treeview-container">
        <Input>
          { selections.map(sel => <Label icon="close">{sel.text}</Label>)}
        </Input>
        { nodes.map(node => <Node 
          {...node}
          onClick={this.handleClick}
          onToggleCollapse={this.handleToggleCollapse}
        />)
        }
      </div>
    )
  }
}

export default Treeview
