import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Button, Segment, Header } from 'semantic-ui-react'
import { FormOverview } from '../../components/institution'

import LocationMap from '../../components/location/map'

import OpportunityForm from '../../components/opportunity/create'
import OpportunitiesList from '../../components/opportunity/list'
import SimpleMediaUploader from '../../components/media/image-uploader'

import InstForm from '../../components/institution/create'
import InstList from '../../components/institution/list'
import { buildImageUrl } from '../../redux/utils'

import * as institutionActions from '../../redux/institution/actions'
import * as opportunityActions from '../../redux/opportunity/actions'
import { uploadLogo } from '../../redux/opportunity/actions'

import { Actions as OppListActions } from '../../components/opportunity/list'
import { Actions as DepListActions } from '../../components/institution/list'

const Types = {
  boolean: 1,
  number: 2,
  string: 3,
  array: {
    number: 4,
    string: 5,
  },
  object: 6
}

const instData = [
  {
    type: Types.string,
    name: 'prename',
  },
  {
    type: Types.string,
    name: 'name'
  },
  {
    type: Types.string,
    name: 'description',
  },
  {
    type: Types.string,
    name: 'draft',
    default: false,
  },
  {
    name: 'type',
    type: Types.string,
  },
  {
    name: 'address',
    type: Types.string,
  },
  {
    name: 'country',
    type: Types.string,
  },
  {
    name: 'county',
    type: Types.string,
  },
  {
    name: 'state',
    type: Types.string,
  },
  {
    name: 'phone',
    type: Types.string,
  },
  {
    name: 'levels',
    type: Types.array.string,
    default: [],
  },
  {
    name: 'adminLevel',
    type: Types.string,
  },
  {
    name: 'logo',
    type: Types.object,
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  },
  {
    name: 'location',
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  {
    name: 'logo',
    notSendable: false,
    type: Types.object,
    format: function(data){
      return {
        file: null,
        url: data && (buildImageUrl(data.url)),
        fakeUrl: '',
      }
    },
    default: {
      file: null,
      url: null,
      fakeUrl: '',
    },
  }
] 

export function setData(origin) {
  const ret = {}
  if (!origin) {
    instData.forEach(f => {
      if (f.type === Types.string) {
        ret[f.name] = (f.default || '')
      } else {
        if(f.type === Types.array.string) {
          console.log('$$$$$$$$$$---')
          console.log(f)
        }
        ret[f.name] = f.default 
      }
    })
    return ret
  } else {
    instData.forEach(f => {
      const odata = origin[f.name]
      if (f.type === Types.string) {
        ret[f.name] = odata || f.default || ''
      } else {
        if(f.type === Types.array.string) {
          console.log('$$$$$$$$$$---')
          console.log(f)
          console.log(odata)
        }
        const result = odata ? (f.format ? f.format(odata): odata ): (f.default)
        console.log(result)
        ret[f.name] = result
      }
    })
    return ret
  }
}

export function extractFormData(origin) {
  if (origin) {
    const ret = {}
    instData.forEach(f => {
      if (!f.notSendable) {
        ret[f.name] = origin[f.name]
      }
    })
    return ret
  }
}

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

    this.handleDepSelectRow = this.handleDepSelectRow.bind(this)
    this.handleDepListAction = this.handleDepListAction.bind(this)

    //this.serializeData = this.serializeData.bind(this)
    this.handleOppSelectRow = this.handleOppSelectRow.bind(this)
    this.handleOppListAction = this.handleOppListAction.bind(this)
    this.handleInstSave = this.handleInstSave.bind(this)
    this.handleInstCancel = this.handleInstCancel.bind(this)
    this.handleAddDependency = this.handleAddDependency.bind(this)

    this.state = {
      ...setData(),

      opportunity: null,
      showOpportunityForm: false,
      showInstForm: false,

      currentLocation: {
        point: {
          lat: 0,
          lng: 0,
        },
        zoom: 3,
      }
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
    this.props.institutionGetTypes()
    this.props.opportunityGetTypes()
  }

  componentWillReceiveProps(nextProps) {
    const { institution } = nextProps
    if (institution && institution.current) {
      const i = institution.current
      this.setState({
        ...setData(i),
      })
    }
  }

  // Save institution overview and location
  handleSave() {
    const { institution, institutionUpdate } = this.props
    institutionUpdate({
      id: institution.current.id,
      ...extractFormData(this.state)
    })
  }

  handleInputChange(e, props) {
    if (props.name === 'currentLocation') {
      console.log(props)
    }
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

  handleClickUploadLogo() {
    const { institution, institutionUploadLogo } = this.props
    if (institution && institution.current)
      institutionUploadLogo(institution.current.id, this.state.logo.file)
  }

  handleOpportunitySave(data) {
    const { institutionAddOpp } = this.props
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

  handleAddDependency() {
    this.setState({
      showInstForm: true,
    })
  }

  handleDepListAction(type, dep) {
    const { history } = this.props
    if (type === DepListActions.EDIT) {
      const { institutionFind } = this.props
      institutionFind(dep.id)
      history.push(`/institution/${dep.id}/edit`)
    } else  if (DepListActions.REMOVE) {
      const { instDelDep } = this.props
      instDelDep(dep)
    }
  }

  handleDepSelectRow(dep) {
  }

  handleInstSave(data) {
    console.log(data)
    const { instAddDep } = this.props
    instAddDep(this.state.dependency, data)
    this.setState({
      showInstForm: false,
    })
  }
  handleInstCancel() {
    this.setState({
      showInstForm: false,
    })
  }

  render() {
    console.log('Rendering Inst/Edit')
    const { institution } = this.props
    const { logo, location } = this.state
    if (institution && institution.current && institution.constants) {
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">Institution:
              {institution.current.name}
            </Header>
          </Grid.Column>
          <Grid.Column width={6}>
            
          {(institution.current.head && institution.current.head.id) && (
              <Segment>
                <Header size="tiny">Depends on:</Header>
                <Button onClick={() => this.props.institutionFind(institution.current.head.id, true)}>
                  {institution.current.head.name}
                </Button>
              </Segment>
            )}

            <Segment>
              <Header size="medium">Logo Profile</Header>
              <SimpleMediaUploader
                name="logo" 
                onChange={this.handleInputChange}
                onUpload={this.handleClickUploadLogo}
                url={logo.url}
                disabled={!logo.fakeUrl}
              />
            </Segment>
            <Segment>
              <Header size="medium">Location</Header>
              <LocationMap
                name="location"
                onCenterChange={this.handleInputChange}
                data={location.point ? location : this.state.currentLocation}
              />
            </Segment>

          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
              <Header size="medium">Overview</Header>
              <FormOverview onInputChange={this.handleInputChange}
                data={this.state}
                constants={institution.constants}
              />
            </Segment>

            <Segment>
              <Header size="medium">Dependencies <Button default onClick={this.handleAddDependency}>Add</Button></Header>
              <InstList items={institution.current.dependencies} onSelectRow={this.handleDepSelectRow}
                onClickAction={this.handleDepListAction}
              />
            </Segment>

            <Segment>
              <Header size="medium">Opportunities <Button default onClick={this.handleAddOpportunity}>Add</Button></Header>
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
            constants={this.props.opp.constants}
            onSave={this.handleOpportunitySave} 
            onCancel={this.handleOpportunityCancel}
            onLogoUpload={this.handleOppLogoUpload}
          />
          <InstForm visible={this.state.showInstForm} institution={this.state.institution}
            constants={institution.constants}
            onSave={this.handleInstSave} 
            onCancel={this.handleInstCancel}
            onLogoUpload={this.handleInstLogoUpload}
          />

        </Grid>
      )
    }
    else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account,
  institution: state.institution,
  opp: state.opp,
}), (dispatch) => ({
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
  institutionUploadLogo: (id, file) => dispatch(institutionActions.uploadLogo(id, file)),
  institutionFind: (id, change) => dispatch(institutionActions.findById(id, change)),
  institutionUpdate: (data) => dispatch(institutionActions.update(data)),
  institutionAddOpp: (opp, data) => dispatch(institutionActions.addOpportunity(opp, data)),
  institutionOppUploadLogo: (id, data) => dispatch(uploadLogo(id, data)),
  institutionRemOpp: (opp) => dispatch(institutionActions.removeOpportunity(opp)),
  instAddDep: (id, data) => dispatch(institutionActions.addDependency(data)),
  instDelDep: (id, data) => dispatch(institutionActions.delDependency(data)),
  institutionGetTypes: () => dispatch(institutionActions.getTypes()),
  opportunityGetTypes: () => dispatch(opportunityActions.getTypes()),

})) (withRouter(Create))

