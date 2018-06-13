import React from 'react'
import { Icon, Input, Button, Label } from 'semantic-ui-react'
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
    const result = onClick(e)
    console.log(result)
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
          <Button icon={collapsed ? 'plus': 'minus'}
            basic
            size="mini" 
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


class Treeview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selections: [],
      searchText: '',
      results: [],
    }
  }
  componentDidMount() {
    console.log(this.props.nodes)
  }
  handleClick = (e) => {
    const { selections } = this.state
    if (!(selections.find(sel => e.value === sel.value))) {
      this.setState({
        selections: this.state.selections.concat([e]),
      })
    }
  }

  handleToggleCollapse = (node) => {
    node.collapsed = !node.collapsed
  }

  filterCategoryList = (value) => {
    const { nodes } = this.props

    const results = []
    function searchList(list, text) {
      list.forEach(l => {
        if (l.data.text.search(text)) {
          results.push({
            data: l.data,
            children: [],
          })
        }
        searchList(l.children, text)
      })
    }

    if (value) {
      searchList(nodes, value)
      console.log(results)
    }

    console.log(results)
    this.setState({
      results, 
    })
  }


  handleChange = (e, {value}) => {
    this.setState({
      searchText: value,
    })
    this.filterCategoryList(value)
  }

  handleRemove = ({value}) => {
    this.setState({
      selections: this.state.selections.filter(sel => sel.value !== value),
    })
  }

  render() {
    const { nodes } = this.props
    const { results, selections, searchText, } = this.state
    return (
      <div className="edumiga-treeview-container">
        <div className="edumiga-treeview-list">
          { selections.map(sel => <Label>{sel.text}<Icon onClick={() => this.handleRemove(sel)} name="delete" /></Label>)}
          <Input value={searchText} onChange={this.handleChange} />
        </div>
        { results.length > 0
          ? results.map(node => <Node 
              {...node}
              key={node.id}
              onClick={this.handleClick}
              onToggleCollapse={this.handleToggleCollapse}
            />)
          : nodes.map(node => <Node 
              {...node}
              key={node.id}
              onClick={this.handleClick}
              onToggleCollapse={this.handleToggleCollapse}
            />)
        }
      </div>
    )
  }
}

export default Treeview
