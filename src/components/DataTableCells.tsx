import React from 'react'
import {
    Avatar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as FallbackUserIcon } from'../assets/fallback_user.svg'


const useConsultantCellStyles = makeStyles({
    root: {
        display: 'flex',
    },
    image: {
        width: 50,
        height: 50
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 15
    }
})

export function ConsultantCell({ data } : { data: string }) {
    const classes = useConsultantCellStyles();
    return (
        <div className={classes.root}>
            <Avatar alt={data} className={classes.image}>
                <FallbackUserIcon className={classes.image}/>
            </Avatar>
            <span className={classes.text}>{data}</span>
        </div>
    )
}

const useProjectStatusStyles = makeStyles({
    root: ({percentData} : {percentData: string}) => ({
        backgroundColor: '#EFEFEF',
        borderRadius: 12,
        padding: '4px 10px 4px 10px',
        lineHeight: 1,
        width: percentData
    })
})

export function ProjectStatusCell({ data } : { data: number }) {
    const percentData = `${data}%`
    const classes = useProjectStatusStyles({ percentData });

    return data > 0 
        ? (
            <div className={classes.root}>
                {percentData}
            </div>
        )
        : <>{'Ikke i prosjekt'}</>
}

const colorLookupTable = {
    'red': '#D10000',
    'green': '#4C8E00'
}

const useCustomerStatusStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    statusLabel: ({ status } : {status: 'red' | 'green' }) => ({
        backgroundColor: colorLookupTable[status],
        width: 20,
        height: 20,
        borderRadius: 10
    })
})

export function CustomerStatusCell({ data: { value, status } } : { data: { value: string, status: 'red' | 'green' } }) {
    const classes = useCustomerStatusStyles({ status });

    return (
        <div className={classes.root}>
            <div>{value || '-'}</div>
            <div className={classes.statusLabel}/>
        </div>
    )
}