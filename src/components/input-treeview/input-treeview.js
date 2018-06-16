import React from 'react'
import { Icon, Input, Label } from 'semantic-ui-react'
import Node from './treeview-node'
import './styles.scss'

class InputTreeview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      results: [],
    }
  }

  handleClick = (e) => {
    const { value, onChange, name } = this.props
    const exists = value.find(sel => e.value === sel.value)
    const newValue = exists ? value: value.concat([e])
    onChange(e, { name, value: newValue })
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

  handleRemove = (e, node) => {
    const { value, onChange, name } = this.props
    const newValue = value.filter(sel => sel.value !== node.value)
    onChange(e, { name, value: newValue })
  }

  handleClearSearchText = () => {
    this.setState({
      searchText: '',
      results: [],
    })
  }

  renderValues() {
    const { value } = this.props
    return (
      <div className="edumiga-treeview-selections">
        {value.map(sel => <Label key={sel.value}>{sel.text}<Icon onClick={(e) => this.handleRemove(e, sel)} name="delete" /></Label>)}
      </div>
    )
  }

  render() {
    const { nodes } = this.props
    const { results, searchText, } = this.state

    return (
      <div className="edumiga-treeview-container">
        { this.renderValues() }
        <Input 
          placeholder="Enter key to find categories"
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
                key={node.data.value}
                onClick={this.handleClick}
                onToggleCollapse={this.handleToggleCollapse}
              />)
            : nodes.map(node => <Node 
                {...node}
                key={node.data.value}
                onClick={this.handleClick}
                onToggleCollapse={this.handleToggleCollapse}
              />)
          }
        </div>
      </div>
    )
  }
}

export default InputTreeview
