import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Segment, Header } from 'semantic-ui-react'
import { Form as InstitutionForm} from '../../components/institution'
import { default as InstitutionMap } from '../../components/location/map'
import { default as InstitutionProfile } from '../../components/media/image-uploader'

import 'leaflet/dist/leaflet.css'


import * as institutionActions from '../../redux/institution/actions'


class Create extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.getSerializedData = this.getSerializedData.bind(this)


    this.state = {
      name: '',
      description: '',
      draft: '',
      type: '',
      address: '',
      lat: -21,
      lng: -66,
      levels: [],
      profileLogo: '',
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
        type: i.type,
        levels: i.levels || [],
        profileLogo: {
          file: null,
          fakeUrl: ''
        }
      })
    }
  }

  getSerializedData() {
    const { institution } = this.props
    return {
      id: institution.current.id,
      name: this.state.name,
      description: this.state.description,
      draft: this.state.draft,
      address: this.state.address,
      type: this.state.type,
      levels: this.state.levels,
    }
  }

  handleSave() {
    const { institutionUpdate } = this.props
    institutionUpdate({
      ...this.getSerializedData()
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleCheckboxChange(e, props) {
    console.log(e)
    console.log(props)
    if (props.name === 'levels'){
      if (props.checked) {
        this.setState({
          levels: this.state.levels.concat([props.value])
        })
      } else {
        this.setState({
          levels: this.state.levels.filter(v => v !== props.value)
        })
      }
    }
  }

  handleFileChange (e, props) {
    const files = e.target.files
    this.setState({
      [props.name]: {
        files: files[0],
        fakeUrl: URL.createObjectURL(files[0]),
      }
    })
  }

  render() {
    const { institution } = this.props
    const { profileLogo, name, description, levels, type, address, draft, lat, lng } = this.state
    if (institution) {
      return (
        <div>
          <Header size="huge">Institution</Header>
          {(institution.current) &&(
            <div>
              <Segment>
                <Header size="normal">Logo Profile</Header>
                <InstitutionProfile 
                  onFileChange={this.handleFileChange}
                  src={profileLogo.fakeUrl}
                />
              </Segment>

              <Segment>
                <Header size="normal">Overview</Header>
                <InstitutionForm onInputChange={this.handleInputChange}
                  onCheckboxChange={this.handleCheckboxChange}
                  name={name} description={description}
                  levels={levels}
                  draft={draft}
                  type={type}
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
