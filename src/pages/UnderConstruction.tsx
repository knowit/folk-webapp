import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

export default function UnderConstruction() {
  const location = useLocation();

  return (
    <Box justifyContent="center">
      <Typography align="center" variant="h6">
        Under Construction: {location.pathname}
      </Typography>
    </Box>
  );
}
