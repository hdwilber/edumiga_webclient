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
    const { onChange } = this.props
    if (!(selections.find(sel => e.value === sel.value))) {
      this.setState({
        selections: this.state.selections.concat([e]),
      }, () => {
        onChange && onChange(e, { value: this.state.selections} )
      })
    }
  }

  handleToggleCollapse = (node) => {
    node.collapsed = !node.collapsed
  }

  filterCategoryList = (value) => {
    const { nodes } = this.props

    let results = []
    function searchList(nodes, text) {
      const regex = new RegExp(text, 'i')
      nodes.forEach(node => {
        if (node.data.text.search(regex) > -1) {
          results.push({
            id: node.id,
            data: node.data,
            children: [],
          })
        }
        searchList(node.children, text)
      })
    }

    if (value) {
      searchList(nodes, value)
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

  handleRemove = (e, {value}) => {
    const { onChange } = this.props
    this.setState({
      selections: this.state.selections.filter(sel => sel.value !== value),
    }, () => {
      onChange && onChange(e, this.state.selections)
    })
  }

  handleClearSearchText = () => {
    this.setState({
      searchText: '',
      results: [],
    })
  }

  render() {
    const { nodes } = this.props
    const { results, selections, searchText, } = this.state
    return (
      <div className="edumiga-treeview-container">
        <div className="edumiga-treeview-selections">
          { selections.map(sel => <Label>{sel.text}<Icon onClick={(e) => this.handleRemove(e, sel)} name="delete" /></Label>)}

        </div>
        <Input 
          placeHolder="Enter key to find categories"
          value={searchText} onChange={this.handleChange}
          action={searchText ?
            { icon: "cancel",  onClick: this.handleClearSearchText }
            : null
          }
        />
        <div className="edumiga-treeview-nodes">
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
      </div>
    )
  }
}

export default Treeview
