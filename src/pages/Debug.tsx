import React, { useEffect, useState } from 'react'
import { getTestV2 } from '../api/client'
import { useEmpData } from '../api/data/employee/employeeQueries'
import { GridItem } from '../components/GridItem'
import { Grid } from '@material-ui/core'

const Debug = () => {
  const [data, setData] = useState<any>()

  // Old api may use hooks to fetch data
  const { data: dt } = useEmpData('einar.halvorsen@knowit.no')

  // New api uses getTestV2 as of now to compare output
  useEffect(() => {
    const fetch = async () => {
      const res = await getTestV2<any>('/employees/empData', {
        params: {
          email: 'einar.halvorsen@knowit.no',
        },
      })

      setData(res)
    }

    fetch()
  }, [])

  return (
    <Grid container spacing={2}>
      <GridItem>
        NEW: API V2
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </GridItem>
      <GridItem>
        OLD: API V1
        <pre>{JSON.stringify(dt, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
