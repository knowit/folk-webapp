import React from 'react'
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

export default function UnderConstruction() {
    const location = useLocation()

    return (
        <Typography variant="h3">Under Construction: {location.pathname}</Typography>
    )
}
