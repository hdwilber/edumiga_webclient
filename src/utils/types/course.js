import { Types, defaultSpec } from './defaults'
import * as CourseActions from '../../redux/course/actions'
import { apiServices } from '../../services'


const Type = {
  id: Types.id,
  name: Types.string,
  code: Types.string,
  level: {
    ...Types.number,
    default: 1,
  },
  description: Types.string,
  duration: Types.number,
  published: {
    ...Types.bool,
    default: true,
  },
  optional: Types.bool,
  type: Types.string,
  prerequisites: [{
    ...Types.string,
    _parse: function (value) {
      return value.id
    },
    _build: (value, data, { courses } ) => {
      return courses.find(c => c.id === value)
      return value
    },
    _save: (value, data, options) => {
      console.log('returning a function for prerequisies')
      return (parent) => {
        console.log('--------------')
        console.log(parent)
        console.log(value)
        const { id } = parent
        if (id) {
          return {
            name: CourseActions.ADD_PRE,
            request: apiServices.course.addPrerequisite(id, value)
          }
        }
        console.log('nothing to do')
        return null
      }
    },
  }],
  //_save: function (isNew, instance) {
    //if (isNew) {
      //return (parent, options) => {
        //console.log('this is the parent %o: ' , parent.id)
        //const { id } = parent
        //instance.opportunityId = instance.opportunityId || id
        //return {
          //name: CourseActions.CREATE,
          //request: apiServices.course.create(instance)
        //}
      //}
    //}
    //return (parent, options) => {
      //console.log('this is the parent %o: ' , parent.id)
      //const { id } = parent
      //instance.opportunityId = instance.opportunityId || id
      //return {
        //name: CourseActions.UPDATE,
        //request: apiServices.course.update(instance)
      //}
    //}
  //}
}

export default Type

