import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Segment, Header } from 'semantic-ui-react'
import { Form as InstitutionForm} from '../../components/institution'
import { default as InstitutionMap } from '../../components/location/map'
import { default as InstitutionProfile } from '../../components/media/image-uploader'

import { buildImageUrl } from '../../redux/utils'

import * as institutionActions from '../../redux/institution/actions'

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleClickUploadLogo = this.handleClickUploadLogo.bind(this)

    this.getSerializedData = this.getSerializedData.bind(this)

    this.handleCenterChange = this.handleCenterChange.bind(this)
    this.handleLocationFound = this.handleLocationFound.bind(this)

    this.handleOppSelectRow = this.handleOppSelectRow.bind(this)

    this.state = {
      name: '',
      duration: '',
      description: '',
      draft: '',
      type: '',

      profileLogo: {
        file: null,
        url: '',
        fakeUrl: '',
      },
    }
  }

  componentDidMount() {
    const { match, opportunityFind } = this.props
    const { opportunityId } = match.params

    if (opportunityId) {
      opportunityFind(opportunityId)
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { opportunity } = nextProps
    console.log(opportunity)
    if (opportunity && opportunity.current) {
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
          url: i.logo && (buildImageUrl(i.logo.url)),
          fakeUrl: '',
        },
        location: i.location ? i.location: { ...this.state.location },
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
      location: this.state.location,
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
    } else {
      this.setState({
        [props.name]: props.checked,
      })
    }
  }

  handleFileChange (e, props) {
    const files = e.target.files
    this.setState({
      [props.name]: {
        ...this.state[props.name],
        file: files[0],
        fakeUrl: URL.createObjectURL(files[0]),
      }
    })
  }

  handleCenterChange(e) {
    console.log(e)
    this.setState({
      location: e.target.getCenter(),
      zoom: e.target.getZoom(),
    })
  }

  handleLocationFound(e) {
    console.log('My location')
    console.log(e)
    if (!this.state.location.lat) {
      this.setState({
        location: e.latlng,
      })
    }
  }

  handleOpportunitySave(data) {
    const { institutionAddOpp } = this.props
    institutionAddOpp(data)
    this.setState({
      showOpportunityForm: false,
    })
  }

  handleOpportunityCancel() {
    this.setState({
      showOpportunityForm: false,
    })
  }

  handleAddOpportunity() {
    this.setState({
      showOpportunityForm: true
    })
  }

  handleClickUploadLogo() {
    const { institution, institutionUploadLogo } = this.props
    console.log(this.state.profileLogo)
    if (institution && institution.current)
      institutionUploadLogo(institution.current.id, this.state.profileLogo.file)
  }

  handleOppSelectRow(opp) {
    this.setState({
      opportunity: opp,
      showOpportunityForm: true,
    })
  }

  render() {
    const { institution } = this.props
    const { zoom, profileLogo, name, description, levels, type, address, draft, location } = this.state
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
                  url={profileLogo.fakeUrl === '' ? profileLogo.url : profileLogo.fakeUrl }
                />
                <Button disabled={!profileLogo.fakeUrl} onClick={this.handleClickUploadLogo}>Upload</Button>
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
                  onCenterChange={this.handleCenterChange}
                  onLocationFound={this.handleLocationFound}
                  position={location}
                  zoom={zoom}
                  address={address}/>
              </Segment>

              <Segment>
                <Header size="normal">Opportunities <Button default onClick={this.handleAddOpportunity}>Add</Button></Header>
                <OpportunitiesList items={institution.current.opportunities} onSelectRow={this.handleOppSelectRow}/>
              </Segment>
              <Button loading={institution.loading} disabled={institution.loading} 
                default
                onClick={this.handleSave}
              >Save</Button>



            <OpportunityForm visible={this.state.showOpportunityForm} opportunity={this.state.opportunity} onSave={this.handleOpportunitySave} onCancel={this.handleOpportunityCancel}/>
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
  institutionUploadLogo: (id, file) => dispatch(institutionActions.uploadLogo(id, file)),
  institutionFind: (id) => dispatch(institutionActions.findById(id)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
  institutionAddOpp: (data) => dispatch(institutionActions.addOpportunity(data)),
})) (withRouter(Create))
