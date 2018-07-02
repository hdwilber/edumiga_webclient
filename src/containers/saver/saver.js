import React from 'react'
import { connect } from 'react-redux'
import { Header, List } from 'semantic-ui-react'
import './styles.scss'

class Saver extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderEvent(ev) {
    const { name, timestamp, status } = ev
    return (
        <List.Item>
          <List.Header>{name}</List.Header>
          <List.Description>{timestamp} | {status}</List.Description>
        </List.Item>
    )
  }


  render() {
    const { events } = this.props
    return (
      <div className="edumiga-saver">
        <Header>Events</Header>
        { events.map(ev => {
            return (
              <List>
                  {this.renderEvent(ev)}
              </List>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { saver } = state
  return {
    events: saver.list
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

const ConnectedSaver = connect(mapStateToProps, mapDispatchToProps)(Saver)

export default ConnectedSaver
