import Types from '../../defaults'
import { Names } from '../actions'
import { Names as OppNames } from '../../opportunity/actions'
import Opportunity from '../../opportunity/types/opportunity'

const CategoryType = {
  _format: function (value) {
    return {
      text: value.name,
      value: value.id,
    }
  },
  _save: {
    beforeAll: function (value = [], oldValue = []) {
      const remove = []

      oldValue.forEach(oval => {
        const exists = value.find(val => val.value === oval.id)
        if (!exists) {
          remove.push(oval)
        }
      })

      if (remove.length === 0) {
        return null
      }

      return (services, options, parent, { value, old, data } = {}) => {
        const { institution } = services
        const { parent: instParent } = parent
        const { values: { data: { id }} } = instParent

        return {
          action: Names.DEL_ALL_CATEGORIES,
          request: institution.delAllCategories(id)
        }
      }
    },

    create: (value = [], oldValue = [], data) => {
      if(value && value.value) {
        return (services, options, parent, { value, old, data } = {} ) => {
          const { parent: { parent: instParent } } = parent
          const { values: { data: { id }} } = instParent
          const { institution } = services
          const { value: cid } = value

          return {
            action: Names.ADD_CATEGORY,
            request: institution.addCategory(id, cid)
          }
        }
      }
      return null
    }
  },
}

const Type = {
  _name: 'Institution',
  id: Types.id,
  prename: Types.string,
  name: Types.string,
  description: Types.string,
  published: Types.bool,
  type: Types.string,
  address: Types.string,
  country: Types.string,
  head: {
    default: null,
    _format: (data) => {
      return (data) 
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
    },
    _save: {
      name: 'parentId',
      format:  (value) => {
        return value ? value.value: null
      }
    }
  },
  state: Types.string,
  county: Types.string,
  phones: [Types.string],
  levels:  [Types.string],
  adminLevel: Types.string,
  location: {
    ...Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  logo: {
    ...Types.image,
    _save: { 
      create: function (value, old, data) {
        const { file } = data
        if (file) {
          return (services, options, parent, { value, old, data }, results) => {
            const { parent: { values: instValues }  } = parent
            const { data: { id } } = instValues
            const { institution } = services
            const request = institution.uploadLogo(id, file)
            return {
              action: Names.UPLOAD_LOGO,
              request,
            }
          }
        }
        return null
      }
    }
  },
  dependencies: [{
    id: Types.id,
    prename: Types.string,
    name: Types.string,
    description: Types.string,
    published: Types.bool,
    type: Types.string,
    address: Types.string,
    country: Types.string,
    //categories: [{
      //...CategoryType,
      //_save: {
        //create: (value, old, data) => {

          //console.log('Aasdfasdfs')
            //console.log(data)
            //console.log(old)
            //console.log(value)

          //if (Object.keys(data).length === 1)
            //return null
          //console.log('Aasdfasdfs222')

          //const { id }  = data
          //if (id) {
            //const isNew = id.indexOf('fake') === 0
            //console.log('Institution to save : %o ', data)
            //return (services, options, parent,  { value, old, data }, results) => {
              //console.log('when saving insttutt')
              //console.log(parent)
              //const { parent: { parent : { values: instValues } } } = parent
              //const { data:  { id : instId } } = instValues
              //const { institution } = services

              //if (isNew) {
                //delete data.id 
                //data.parentId = instId
              //}

              //const request = isNew ? institution.create(data) :  institution.update(data)
              //return {
                //action: isNew ? Names.CREATE: Names.UPDATE,
                //request,
              //}
            //}
          //}
          //return null
        //}
      //},
    //}]
    _save: {
      create: (value, old, data) => {
        if (Object.keys(data).length === 1)
          return null

        const { id }  = data
        if (id) {
          const isNew = id.indexOf('fake') === 0
          console.log('Institution to save as dependenct: %o ', data)
          return (services, options, parent,  { value, old, data }, results) => {

            const { institution } = services

            console.log(parent)
            const { parent: { parent : { values: headValues } } } = parent
            const { data:  { id : headId } } = headValues

            if (isNew) {
              delete(data.id)
              data.parentId = headId
            }
            const request = isNew ? institution.create(data) : institution.update(data)
            return {
              action: isNew ? Names.CREATE: Names.UPDATE,
              request,
            }
          }
        }
        return null
      }
    }
  }],
  opportunities: [{
    ...Opportunity,
    institutionId: Types.string,
    _save: {
      create: function(value, old, data) {
        if (Object.keys(data).length === 1)
          return null
        return (services, options, parent ) => {
          const { id } = data
          const { opportunity } = services
          const isNew = id.indexOf('fake') === 0
          let instId

          if (parent) {
            const { parent: { parent: instParent } } = parent
            if (instParent.values.save && instParent.values.save.id) {
              instId = instParent.values.save.id
            }
            else if (instParent.values.value && instParent.values.value.id)
              instId = instParent.values.value.id
            else if (instParent.values.old && instParent.values.old.id)
              instId = instParent.values.old.id
          }
          if (isNew) {
            delete data.id
          }

          const request = isNew 
            ? opportunity.create({...data, institutionId: instId})
            : opportunity.update(data)

          return {
            action: isNew ? OppNames.CREATE: OppNames.UPDATE,
            request
          }
        }
      },
    }
  }],
  categories: [CategoryType],
  _save: {
    create: (value, old, data) => {

      if (Object.keys(data).length === 1)
        return null

      const { id }  = data
      if (id) {
        const isNew = id.indexOf('fake') === 0
        console.log('Institution to save : %o ', data)
        return (services, options, parent,  { value, old, data }, results) => {
          const { institution } = services
          const request = institution.update(data)
          return {
            action: isNew ? Names.CREATE: Names.UPDATE,
            request,
          }
        }
      }
      return null
    }
  }
}


export default Type

