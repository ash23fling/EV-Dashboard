import {
  Container,
  CssBaseline,
  Grid,
  TablePagination,
  Typography,
  createTheme,
  styled,
  CircularProgress,
  Box,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  LinearScale,
  Title,
} from "chart.js";
import React, { useState } from "react";
import "../Dashboard.css";
import useFetchData from "../hooks/useFetchData";
import ThemeProvider from "../ThemeProvider";
import { prepareEVGrowthData, prepareEVTypeData } from "../utils/chartData";
import { barChartOptions, pieChartOptions } from "./chartOptions";
import DetailedEVData from "./DetailedEVData";
import ErrorDisplay from "./ErrorDisplay";
import EVCharts from "./EVCharts";
import EVDialog from "./EVDialog";
import EVModels from "./EVModels";
import Footer from "./Footer";
import Header from "./Header";
import StatsBox from "./StatsBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { data, totalEVs, loading, error } = useFetchData("/ev_data.csv");

  const [pageModels, setPageModels] = useState(0);
  const [rowsPerPageModels, setRowsPerPageModels] = useState(10);
  const [pageDetails, setPageDetails] = useState(0);
  const [rowsPerPageDetails, setRowsPerPageDetails] = useState(10);
  const [selectedMake, setSelectedMake] = useState(null);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const groupedData = data.reduce((acc, item) => {
    const make = item["Make"];
    const model = item["Model"];
    const range = parseInt(item["Electric Range"], 10) || 0;

    if (!acc[make]) {
      acc[make] = {};
    }

    if (!acc[make][model]) {
      acc[make][model] = { maxRange: range, count: 1 };
    } else {
      acc[make][model].maxRange = Math.max(acc[make][model].maxRange, range);
      acc[make][model].count += 1;
    }

    return acc;
  }, {});

  const sortedDataByYear = [...data].sort((a, b) => {
    const yearA = parseInt(a["Model Year"], 10);
    const yearB = parseInt(b["Model Year"], 10);
    return yearB - yearA; // Sort in descending order
  });

  const sortedMakes = Object.keys(groupedData)
    .filter((make) => make && make.trim() !== "undefined")
    .sort((a, b) => {
      return (
        Object.keys(groupedData[b]).length - Object.keys(groupedData[a]).length
      );
    });

  const bestRangeModel = Object.entries(groupedData).reduce(
    (best, [make, models]) => {
      Object.entries(models).forEach(([model, data]) => {
        if (data.maxRange > (best.range || 0)) {
          best = { model: `${make} ${model}`, range: data.maxRange };
        }
      });
      return best;
    },
    { model: "", range: 0 }
  );

  const makeWithMostModels = sortedMakes[0];

  const makeWithBestRangeModel = data.reduce((best, item) => {
    const range = parseInt(item["Electric Range"], 10);
    if (range > (best.range || 0)) {
      return { make: item["Make"], range };
    }
    return best;
  }, {});

  const countyCounts = data.reduce((acc, item) => {
    const county = item["County"];
    if (county) {
      acc[county] = (acc[county] || 0) + 1;
    }
    return acc;
  }, {});

  const countyWithMostEVs = Object.keys(countyCounts).reduce(
    (a, b) => (countyCounts[a] > countyCounts[b] ? a : b),
    0
  );

const modelCounts = data.reduce((acc, item) => {
    const model = `${item["Make"]} ${item["Model"]}`;
    acc[model] = (acc[model] || 0) + 1;
    return acc;
  }, {});
  
  const mostPopularModel = Object.keys(modelCounts).reduce((a, b) => 
    modelCounts[a] > modelCounts[b] ? a : b, ''
  );
  
  const mostPopularEV = {
    model: mostPopularModel,
    count: modelCounts[mostPopularModel]
  };
  
  const handleOpen = (make) => {
    setSelectedMake(make);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMake(null);
  };

  const handleChangePageModels = (event, newPage) => {
    setPageModels(newPage);
  };

  const handleChangeRowsPerPageModels = (event) => {
    setRowsPerPageModels(parseInt(event.target.value, 10));
    setPageModels(0);
  };

  const handleChangePageDetails = (event, newPage) => {
    setPageDetails(newPage);
  };

  const handleChangeRowsPerPageDetails = (event) => {
    setRowsPerPageDetails(parseInt(event.target.value, 10));
    setPageDetails(0);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
    "& .MuiTablePagination-toolbar": {
      justifyContent: "space-between",
    },
    "& .MuiTablePagination-selectLabel": {
      margin: theme.spacing(1),
    },
    "& .MuiTablePagination-displayedRows": {
      margin: theme.spacing(1),
    },
    "& .MuiTablePagination-actions": {
      margin: theme.spacing(1),
    },
  }));

  return (
    <ThemeProvider darkMode={darkMode}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container maxWidth="xl" className="container">
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            <CircularProgress />
            <Typography variant="h6" component="p" marginTop={2}>
              Loading data, please wait...
            </Typography>
            <Typography variant="body2" component="p" marginTop={1}>
              Did you know? The first electric car was built in the early 19th
              century!
            </Typography>
          </Box>
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : (
          <>
            <StatsBox
              totalEvPopulation={totalEVs}
              bestRangeModel={bestRangeModel}
              makeWithMostModels={makeWithMostModels}
              makeWithBestRangeModel={makeWithBestRangeModel}
              countyWithMostEVs={countyWithMostEVs}
              mostPopularEV = {mostPopularEV}
            />

            <Grid container spacing={3}>
              <EVCharts
                data={data}
                prepareEVGrowthData={prepareEVGrowthData}
                prepareEVTypeData={prepareEVTypeData}
                barChartOptions={barChartOptions}
                pieChartOptions={pieChartOptions}
              />

              <EVModels
                sortedMakes={sortedMakes}
                pageModels={pageModels}
                rowsPerPageModels={rowsPerPageModels}
                handleOpen={handleOpen}
                handleChangePageModels={handleChangePageModels}
                handleChangeRowsPerPageModels={handleChangeRowsPerPageModels}
              />

              <DetailedEVData
                data={sortedDataByYear}
                pageDetails={pageDetails}
                rowsPerPageDetails={rowsPerPageDetails}
                handleChangePageDetails={handleChangePageDetails}
                handleChangeRowsPerPageDetails={handleChangeRowsPerPageDetails}
              />
            </Grid>
          </>
        )}

        <EVDialog
          open={open}
          handleClose={handleClose}
          selectedMake={selectedMake}
          groupedData={groupedData}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Dashboard;
