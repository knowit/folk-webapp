import { useEmployeeStructure } from '../../api/data/employee/employeeQueries'
import OrganizationStructureTree from './Components/OrganizationStructureTree'
import { BaseSkeleton } from '../../components/skeletons/BaseSkeleton'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import { pageTitle } from '../../utils/pagetitle'
import { useState } from 'react'
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material'
import { withStyles } from '@mui/styles'
import OSTtest from './Components/OSTtest'
import data2 from './data.json'

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
))

export default function OrganizationStructurePage() {
  const { data, isLoading, error } = useEmployeeStructure()
  const [collapsChildren, setCollapsChildren] = useState(false)

  pageTitle('Organisasjonsstruktur')

  if (isLoading) {
    return (
      <BaseSkeleton variant="rectangular" width={'100%'} height={'100vh'} />
    )
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  function toggleDisplay() {
    setCollapsChildren(!collapsChildren)
  }

  const checkBox = {
    label: 'Skjul barn',
    changeHandler: toggleDisplay,
    checked: collapsChildren,
  }

  return (
    <>
      <div style={{ width: '60%' }}>
        <FormControlLabel
          control={<BlackCheckBox onChange={checkBox.changeHandler} />}
          label={checkBox.label}
          checked={checkBox.checked}
        />{' '}
      </div>

      {/**    <OrganizationStructureTree
        collapsChildren={collapsChildren}
        data={data}
        width={1215}
        height={1200}
        margin={140}
      />
      */}
      <OSTtest data={data2} />
    </>
  )
}
