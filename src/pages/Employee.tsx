import React from 'react'
import {
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    Line,
    Bar,
    PercentArea,
    Pie
} from '../components/charts'
import DataTable from '../components/DataTable'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridRoot: {
        },
        gridContent: {
            width: '100%',
            height: 400
        }
    })
)

const GridItem = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} sm={6}>
            <Card className={classes.gridRoot}>
                <CardContent className={classes.gridContent}>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default function Employee() {
    return (
        <Grid container spacing={3}>

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

            <Grid item xs={12} sm={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Table</Typography>

                        <DataTable />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}
