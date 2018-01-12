import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Segment, Header } from 'semantic-ui-react'
import { default as ImageUploader } from '../../components/media/image-uploader'

import OppForm from '../../components/opportunity/simple-form'

import { buildImageUrl } from '../../redux/utils'

import * as opportunityActions from '../../redux/opportunity/actions'

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
      degree: '',

      profileLogo: {
        file: null,
        url: '',
        fakeUrl: '',
      },
    }
  }

  componentDidMount() {
    const { match, oppFind } = this.props
    const { opportunityId } = match.params

    if (opportunityId) {
      oppFind(opportunityId)
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { opp } = nextProps
    console.log(opp)
    if (opp && opp.current) {
      const i = opp.current
      this.setState({
        name: i.name,
        description: i.description,
        draft: i.draft,
        degree: i.degree,
        type: i.type,
        profileLogo: {
          file: null,
          url: i.logo && (buildImageUrl(i.logo.url)),
          fakeUrl: '',
        },
      })
    }
  }

  getSerializedData() {
    const { opp } = this.props
    return {
      id: opp.current.id,
      name: this.state.name,
      description: this.state.description,
      draft: this.state.draft,
      degree: this.state.degree,
      type: this.state.type,
      location: this.state.location,
    }
  }

  handleSave() {
    const { oppUpdate } = this.props
    oppUpdate({
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

  handleClickUploadLogo() {
    const { opp, oppUploadLogo } = this.props
    console.log(this.state.profileLogo)
    if (opp && opp.current)
      oppUploadLogo(opp.current.id, this.state.profileLogo.file)
  }

  handleOppSelectRow(opp) {
    this.setState({
      opportunity: opp,
      showOpportunityForm: true,
    })
  }

  render() {
    const { opp } = this.props
    const { zoom, profileLogo, name, degree, description, levels, type, address, draft, location } = this.state
    if (opp) {
      return (
        <div>
          <Header size="huge">Opportunity</Header>
          {(opp.current) &&(
            <div>
              <Segment>
                <Header size="normal">Logo Profile</Header>
                <ImageUploader
                  onFileChange={this.handleFileChange}
                  url={profileLogo.fakeUrl === '' ? profileLogo.url : profileLogo.fakeUrl }
                />
                <Button disabled={!profileLogo.fakeUrl} onClick={this.handleClickUploadLogo}>Upload</Button>
              </Segment>

              <Segment>
                <Header size="normal">Overview</Header>
                <OppForm onInputChange={this.handleInputChange}
                  onCheckboxChange={this.handleCheckboxChange}
                  name={name} description={description}
                  degree={degree}
                  draft={draft}
                  type={type}
                />
              </Segment>
              <Segment>
                <Header size="normal">Subjects<Button default onClick={this.handleAddOpportunity}>Add</Button></Header>
              </Segment>

              <Button loading={opp.loading} disabled={opp.loading} 
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
  opp: state.opp
}), (dispatch) => ({
  oppUploadLogo: (id, file) => dispatch(opportunityActions.uploadLogo(id, file)),
  oppFind: (id) => dispatch(opportunityActions.findById(id)),
  oppUpdate: (data) => dispatch(opportunityActions.update(data)),
})) (withRouter(Edit))
