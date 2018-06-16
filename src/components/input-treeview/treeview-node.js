import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import './styles.scss'

class Node extends React.Component {
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

  handleClick(e) {
    const { onClick } = this.props
    onClick(e)
  }

  render() {
    const {
      data,
      onClick,
      children,
      main,
    } = this.props

    const {
      collapsed,
      selectable,
    } = this.state

    return (
      <div className={`edumiga-treeview-node ${main ? 'main-node' :''}`}>
        { (children && children.length > 0) && (
          <Button icon={collapsed ? 'plus': 'minus'}
            size="tiny" 
            compact
            onClick={this.handleToggleCollapse}
          />
        )}
        <Label
          onClick={selectable && (() => this.handleClick(data))}
        >
          {data.text}
        </Label>
        {!collapsed && children && children.map(child => <Node key={child.data.value} {...child} onClick={onClick} />)}
      </div>
    )
  }
}

export default Node
