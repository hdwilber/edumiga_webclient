import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Segment, Header } from 'semantic-ui-react'
import { Form as InstitutionForm} from '../../components/institution'
import { default as InstitutionMap } from '../../components/location/map'

import 'leaflet/dist/leaflet.css'


import * as institutionActions from '../../redux/institution/actions'


class Create extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getSerializedData = this.getSerializedData.bind(this)

    this.state = {
      name: '',
      description: '',
      draft: '',
      address: '',
      lat: -21,
      lng: -66,
    }
  }

  componentDidMount() {
    const { match, institutionFind } = this.props
    const { institutionId } = match.params

    if (institutionId) {
      institutionFind(institutionId)
    } else {
      const { institutionCreate } = this.props
      institutionCreate({})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { institution } = nextProps
    console.log(institution)
    if (institution && institution.current) {
      const i = institution.current
      this.setState({
        name: i.name,
        description: i.description,
        draft: i.draft,
        address: i.address || '',
      })
    }
  }

  getSerializedData() {
    const { institution } = this.props
    return {
      ...institution,
      name: this.state.name,
      description: this.state.description,
      draft: this.state.draft,
      address: this.state.address,
    }
  }

  handleSave() {
    const { institution, institutionUpdate } = this.props
    institutionUpdate({
      ...institution.current,
      ...this.getSerializedData()
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  render() {
    const { institution } = this.props
    const { name, description, address, draft, lat, lng } = this.state
    if (institution) {
      return (
        <div>
          <Header size="huge">Institution</Header>
          {(institution.current) &&(
            <div>
              <Segment>
                <Header size="normal">Overview</Header>
                <InstitutionForm onInputChange={this.handleInputChange}
                  name={name} description={description}
                  draft={draft}
                />
              </Segment>
              <Segment>
                <Header size="normal">Location</Header>
                <InstitutionMap onInputChange={this.handleInputChange} 
                  position={[lat, lng]} 
                  address={address}/>
              </Segment>
              <Button loading={institution.loading} disabled={institution.loading} 
                default
                onClick={this.handleSave}
              >Save</Button>
            </div>
          )}
        </div>
      )
    } else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account,
  institution: state.institution,
}), (dispatch) => ({
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
  institutionFind: (id) => dispatch(institutionActions.findById(id)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
})) (withRouter(Create))
