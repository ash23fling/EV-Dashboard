import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/system';

const DetailedEVData = ({
  data,
  pageDetails,
  rowsPerPageDetails,
  handleChangePageDetails,
  handleChangeRowsPerPageDetails,
}) => {
  const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
    '& .MuiTablePagination-toolbar': {
      justifyContent: 'space-between',
    },
    '& .MuiTablePagination-selectLabel': {
      margin: theme.spacing(1),
    },
    '& .MuiTablePagination-displayedRows': {
      margin: theme.spacing(1),
    },
    '& .MuiTablePagination-actions': {
      margin: theme.spacing(1),
    },
  }));

  return (
    <Grid item xs={12}>
      <Paper className="statistics-paper" elevation={3}>
        <Typography variant="h6" component="h3">
          Detailed EV Data
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model Year</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>County</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(
                  pageDetails * rowsPerPageDetails,
                  pageDetails * rowsPerPageDetails + rowsPerPageDetails
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row["Model Year"]}</TableCell>
                    <TableCell>{row["Make"]}</TableCell>
                    <TableCell>{row["Model"]}</TableCell>
                    <TableCell>{row["Electric Vehicle Type"]}</TableCell>
                    <TableCell>{row["County"]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPageDetails}
          page={pageDetails}
          onPageChange={handleChangePageDetails}
          onRowsPerPageChange={handleChangeRowsPerPageDetails}
        />
      </Paper>
    </Grid>
  );
};

export default DetailedEVData;
