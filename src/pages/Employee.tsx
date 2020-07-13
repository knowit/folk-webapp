import React from 'react'
import {
    Grid,
} from '@material-ui/core'
import {
    Line,
    Bar,
    PercentArea,
    Pie
} from '../components/charts'
import DataTable from '../components/DataTable'
import { 
    GridItem,
    GridItemHeader,
    GridItemContent
} from '../components/GridItem';



export default function Employee() {
    return (
        <Grid container spacing={2}>

            <GridItem>
                <GridItemHeader title={"På vei inn"} />
                <GridItemContent>
                    <Line />
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"På vei ut"} />
                <GridItemContent>
                    <Bar />
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"Erfaringsnivå"} />
                <GridItemContent>
                    <PercentArea />
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"Ressurstype"} />
                <GridItemContent>
                    <Pie />
                </GridItemContent>
            </GridItem>

            <GridItem fullSize >
                <GridItemHeader title={"Prosjektstatus"} />
                <GridItemContent>
                    <DataTable />
                </GridItemContent>
            </GridItem>
        </Grid>

    )
}
