import React from 'react'
import { connect } from 'react-redux'
import { push  } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Button, Segment, Header } from 'semantic-ui-react'
import { FormOverview } from '../../components/institution'

import LocationMap from '../../components/location/map'

import OpportunityForm from '../../components/opportunity/create'
import OpportunitiesList from '../../components/opportunity/list'
import SimpleMediaUploader from '../../components/media/image-uploader'

import { buildImageUrl } from '../../redux/utils'

import * as institutionActions from '../../redux/institution/actions'

import { Actions as OppListActions } from '../../components/opportunity/list'

class Create extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleClickUploadLogo = this.handleClickUploadLogo.bind(this)
    this.handleAddOpportunity = this.handleAddOpportunity.bind(this)
    this.handleOpportunitySave = this.handleOpportunitySave.bind(this)
    this.handleOpportunityCancel = this.handleOpportunityCancel.bind(this)

    this.serializeData = this.serializeData.bind(this)

    this.handleOppSelectRow = this.handleOppSelectRow.bind(this)
    this.handleOppListAction = this.handleOppListAction.bind(this)

    this.state = {
      name: '',
      description: '',
      draft: '',
      type: '',
      address: '',
      lat: -21,
      lng: -66,
      levels: [],
      logo: {
        file: null,
        url: '',
        fakeUrl: '',
      },
      location: {
        point: {
          lat: null,
          lng: null,
        },
        zoom: 10,
      },
      opportunity: null,

      showOpportunityForm: false,
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
        logo: {
          file: null,
          url: i.logo && (buildImageUrl(i.logo.url)),
          fakeUrl: '',
        },
        location: i.location ? i.location: { ...this.state.location },
      })
    }
  }

  serializeData() {
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
      ...this.serializeData()
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleCheckboxChange(e, props) {
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

  handleOpportunitySave(data) {
    const { institutionAddOpp } = this.props
    console.log(data)
    institutionAddOpp(this.state.opportunity, data)
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
      showOpportunityForm: true,
      opportunity: null,
    })
  }

  handleClickUploadLogo() {
    const { institution, institutionUploadLogo } = this.props
    console.log(this.state.logo)
    if (institution && institution.current)
      institutionUploadLogo(institution.current.id, this.state.logo.file)
  }

  handleOppSelectRow(opp) {
    this.setState({
      opportunity: opp,
      showOpportunityForm: true,
    })
  }

  handleOppListAction(type, opp) {
    const { institution, history } = this.props
    if (type === OppListActions.EDIT) {
      history.push(`/institution/${institution.current.id}/opportunity/${opp.id}`)
    } else if (type === OppListActions.REMOVE){
      const { institutionRemOpp } = this.props
      institutionRemOpp(opp)
    }
  }

  render() {
    const { institution } = this.props
    const { logo, name, description, levels, type, address, draft, location } = this.state
    if (institution && institution.current) {
      const data = this.serializeData()
      return (
        <div>
          <Header size="huge">Institution</Header>
          {(institution.current) &&(
            <Grid container>
              <Grid.Column width={6}>
                <Segment>
                  <Header size="normal">Logo Profile</Header>
                  <SimpleMediaUploader
                    name="logo" 
                    onChange={this.handleInputChange}
                    onUpload={this.handleClickUploadLogo}
                    url={logo.fakeUrl === '' ? logo.url : logo.fakeUrl }
                    disabled={!logo.fakeUrl}
                  />
                </Segment>
                <Segment>
                  <Header size="normal">Location</Header>
                  <LocationMap
                    name="location"
                    onCenterChange={this.handleInputChange}
                    data={data.location}
                  />
                </Segment>

              </Grid.Column>

              <Grid.Column width={10}>
                <Segment>
                  <Header size="normal">Overview</Header>
                  <FormOverview onInputChange={this.handleInputChange}
                    onCheckboxChange={this.handleCheckboxChange}
                    data={data}
                  />
                </Segment>

                <Segment>
                  <Header size="normal">Opportunities <Button default onClick={this.handleAddOpportunity}>Add</Button></Header>
                  <OpportunitiesList items={institution.current.opportunities} onSelectRow={this.handleOppSelectRow}
                    onClickAction={this.handleOppListAction}
                  />
                </Segment>

                <Button loading={institution.loading} disabled={institution.loading} 
                  default
                  onClick={this.handleSave}
                >Save</Button>

              </Grid.Column>

            <OpportunityForm visible={this.state.showOpportunityForm} opportunity={this.state.opportunity} 
              onSave={this.handleOpportunitySave} 
              onCancel={this.handleOpportunityCancel}
              onLogoUpload={this.handleOppLogoUpload}
            />
            </Grid>
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
  institutionAddOpp: (opp, data) => dispatch(institutionActions.addOpportunity(opp, data)),
  institutionRemOpp: (opp) => dispatch(institutionActions.removeOpportunity(opp)),
})) (withRouter(Create))
