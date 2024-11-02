import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const StatisticsBox = ({ totalEvPopulation, bestRangeModel, makeWithMostModels, makeWithBestRangeModel, countyWithMostEVs,mostPopularEV }) => {
  return (
    <div className="statistics-box">
      <Typography variant="h6" component="h3">
        EV Statistics
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">Total EV's</Typography>
            <Typography variant="h6">{totalEvPopulation}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">Make with Most Models</Typography>
            <Typography variant="h6">{makeWithMostModels}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">Most Popular Model</Typography>
            <Typography variant="h6">{mostPopularEV.model}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">Model with Best Range</Typography>
            <Typography variant="h6">{bestRangeModel.model} ({bestRangeModel.range} miles)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">Make with Best Range Model</Typography>
            <Typography variant="h6">{makeWithBestRangeModel.make} ({makeWithBestRangeModel.range} miles)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="statistics-paper" elevation={3}>
            <Typography variant="body1">County with Most EVs</Typography>
            <Typography variant="h6">{countyWithMostEVs}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticsBox;
