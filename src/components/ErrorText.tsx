import { makeStyles } from '@material-ui/core'
import React from 'react'

const useErrorStyle = makeStyles({
    root:{
        color: "#802826",
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 25,
    },
})
export const NoData = () => (
    <div title = "Data ikke tilgjengelig">-</div>
)
export const ErrorText = () => {
    const classes = useErrorStyle();
    return(
        <div className ={classes.root}>
            <h2> Oida, en feil har oppstått</h2>
            <div> Data kan ikke vises for dette valget</div>
        </div>
    );
}