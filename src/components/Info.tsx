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

export default function Info() {
    const placeholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin congue velit eget scelerisque. Suspendisse venenatis sem vel elit fermentum cursus. Maecenas non euismod arcu. Quisque nec consequat nulla, a iaculis ligula. Aenean pretium odio nisi, eu tincidunt sem finibus a. Vivamus pretium, felis vel pretium sagittis, quam odio hendrerit purus, sed blandit mauris diam in erat. Sed id ipsum at arcu mattis ultrices a vitae felis. Donec quam dolor, mattis nec aliquet at, fringilla ac velit. Nullam egestas tristique sem ut venenatis. Sed sapien orci, vestibulum dignissim nulla laoreet, vestibulum placerat velit. Vestibulum scelerisque ultrices lacus, eget sollicitudin dui semper ut. Sed cursus magna quis rhoncus malesuada. Ut rhoncus vitae ante ac ornare. Nam sit amet sapien vitae augue vehicula rhoncus.';
    const classes = useStyles();
    return (
        <Tooltip title={placeholder} placement='right-start' arrow={true}>
            <InfoIcon className={classes.infoIcon} />
        </Tooltip>
    );
}