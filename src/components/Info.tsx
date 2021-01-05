import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        infoIcon: {
            paddingLeft: '4px'
        },
    })
);

interface InfoProps {
    description?: string
  }

export default function Info({ description }: InfoProps) {
    const classes = useStyles();
    if(description) {
        return (
            <Tooltip title={description} placement='right-start' arrow={true}>
                <InfoIcon className={classes.infoIcon} />
            </Tooltip>
        );
    } else {
        return null;
    }
}