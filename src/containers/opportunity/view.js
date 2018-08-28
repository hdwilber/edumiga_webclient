import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Icon, Segment, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import withApiService from '../withApiService'
import { withTypesManager } from '../shared/types'
import withAuthorization from '../authorization'
import { UserState } from '../authorization'
import { nologo } from '../../utils/constants'
import { buildImageUrl } from '../../utils/image-url'

class View extends React.Component {
  componentDidMount() {
    const { match } = this.props
    const { opportunityId } = match.params

    if (!this.findResume(opportunityId)) {
      const { history } = this.props
      history.pop()
    }
  }

  findResume = (id) => {
    if (id) {
      const { typesManager: { opportunity } } = this.props
      opportunity.findOne(id)
      opportunity.getTypes()
      return true
    }
    return false
  }

  renderActionButtons = () => {
    const { opportunity: { id } } = this.props
    const targetLink = `/opportunity/${id}/editor`
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          as={Link}
          to={targetLink}
          primary
        >
          <Icon name="eye" />
          Editor
        </Button>
      </Button.Group>
    )
  }

  render() {
    const { opportunity } = this.props
    if (opportunity) {
      const { name, logo } = opportunity
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">
              {name}
              {this.renderActionButtons()}
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <Image src={logo ? buildImageUrl(logo.url): nologo} />
            </Segment>

          </Grid.Column>
        </Grid>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}
function mapStateToProps(state) {
  const { opportunity } = state
  return {
    opportunity: opportunity.current,
    processing: opportunity.loading,
    constants: opportunity.constants,
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps) (View)

export default withTypesManager(withApiService(withAuthorization(ConnectedComponent, UserState.ACCOUNT)))
