import React from 'react'
import {
    Grid,
    Typography
} from '@material-ui/core'
import {
    Line,
    Bar,
    PercentArea,
    Pie
} from '../components/charts'
import DataTable from '../components/DataTable'
import GridItem from '../components/GridItem';



export default function Employee() {
    return (
        <Grid container spacing={2}>

            <GridItem>
                <Typography variant="h6">Line chart</Typography>
                <Line />
            </GridItem>

            <GridItem>
                <Typography variant="h6">Bar chart</Typography>
                <Bar />
            </GridItem>

            <GridItem>
                <Typography variant="h6">Area chart</Typography>
                <PercentArea />
            </GridItem>

            <GridItem>
                <Typography variant="h6">Bar chart</Typography>
                <Pie />
            </GridItem>

            <GridItem fullSize height={'inherit'}>
                <Typography variant="h6">Table</Typography>
                <DataTable />
            </GridItem>
        </Grid>

    )
}
