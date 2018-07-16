import React from 'react'
import { FastEditor } from '../../components/fast-editor'
import InstitutionForm from '../../components/institution/form-general'
import OpportunityForm from '../../components/opportunity/form-general'
import CourseForm from '../../components/course/form-general'

import Course from '../../redux/course/types/course'
import Institution from '../../redux/institution/types/institution'
import Opportunity from '../../redux/opportunity/types/opportunity'

export function InstitutionFastEditor (props) { return <FastEditor 
    specs={Institution}
    content={InstitutionForm}
    {...props}
  />
}

export function OpportunityFastEditor (props) { 
  return <FastEditor
    specs={Opportunity}
    content={OpportunityForm}
    {...props}
  />
}

export function CourseFastEditor (props) { 
  const { courses, } = props
  return <FastEditor
    specs={Course}
    content={CourseForm}
    constants={{ courses, }}
    {...props}
  />
}
