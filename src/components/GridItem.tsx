import React from 'react'
import {
    Card,
    CardContent,
    Grid,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridRoot: {
        },
        gridContent: (props : { height: number|string }) => ({
            width: '100%',
            height: props.height,
            overflowY: 'auto'
        })
    })
)

interface GridItemProps {
    fullSize?: boolean
    height?: number|string
    children: React.ReactNode | React.ReactNode[]
}

export default function GridItem(
{ 
    children,
    height = 355,
    fullSize = false,
}: GridItemProps) {
    const classes = useStyles({ height })
    return (
        <Grid item xs={fullSize ? 12 : 6}>
            <Card className={classes.gridRoot}>
                <CardContent className={classes.gridContent}>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}