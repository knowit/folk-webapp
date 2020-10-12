import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {theme} from '../../src/index'

const useErrorStyle = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            width: '100%',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            height:280,
            color: theme.palette.error.main,
            
        },
        titleText:{
            fontSize: '18px',
            fontWeight: 'bold',
            lineHeight: 1.28,
        },
        text:{
            fontSize: '16px',
            lineHeight: 1.5,
        }
    })
);

export const NoData = () => (
    <div title = "Data ikke tilgjengelig">-</div>
)
export const ErrorText = () => {
    const classes = useErrorStyle(theme);

    return(
        <div className ={classes.root}>
            <div className ={classes.titleText}> Oida, en feil har oppstått</div>
            <div className ={classes.text}> Data kan ikke vises for dette valget</div>
        </div>
    );
}