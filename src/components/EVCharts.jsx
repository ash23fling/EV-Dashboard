import React from "react";
import { Grid,Typography,Paper } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import "../Dashboard.css"; // Ensure the path is correct

const EVCharts = ({ data, prepareEVGrowthData, prepareEVTypeData, barChartOptions, pieChartOptions }) => {
  if (!data || data.length === 0) {
    return null; // or a loading indicator
  }

  const evGrowthData = prepareEVGrowthData(data);
  const evTypeData = prepareEVTypeData(data);

  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h6" component="h3">
            EV Growth Over Years
          </Typography>
          <Bar data={evGrowthData} options={barChartOptions} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h6" component="h3">
            EV Types Distribution
          </Typography>
          <Pie data={evTypeData} options={pieChartOptions} />
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default EVCharts;
