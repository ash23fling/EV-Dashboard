import React from 'react';
import { Grid, Card, CardContent, Typography, Tooltip, TablePagination, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { SiTesla,SiNissan, SiChevrolet,SiHyundai,SiBmw,SiAudi,SiFord,SiKia,SiVolvo,SiToyota,SiMercedes } from "react-icons/si";
import { FaCar} from 'react-icons/fa';

const EVModels = ({ sortedMakes, pageModels, rowsPerPageModels, handleOpen, handleChangePageModels, handleChangeRowsPerPageModels }) => {
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

  // Mapping of vehicle makes to their corresponding icons
  const makeIcons = {
    TESLA: <SiTesla />,
    BMW: <SiBmw />,
    HYUNDAI: <SiHyundai />,
    NISSAN: <SiNissan />,
    CHEVROLET: <SiChevrolet />,
    AUDI: <SiAudi />,
    FORD: <SiFord />,
    KIA: <SiKia />,
    VOLVO: <SiVolvo />,
    TOYOTA: <SiToyota />,
   ["MERCEDES-BENZ"]: <SiMercedes/>
  };

  return (
    <Grid item xs={12}>
      <Paper className="statistics-paper" elevation={3}>
        <Typography variant="h6" component="h3">
          EV Models and Their Ranges
        </Typography>
        <Grid container spacing={3}>
          {sortedMakes
            .slice(
              pageModels * rowsPerPageModels,
              pageModels * rowsPerPageModels + rowsPerPageModels
            )
            .map((make, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Tooltip title={`Click to view models of ${make}`} arrow>
                  <Card className="card" onClick={() => handleOpen(make)}>
                    <CardContent className="card-content">
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Avatar>
                            {makeIcons[make] || <FaCar />} 
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">{make}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            ))}
        </Grid>
        <StyledTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedMakes.length}
          rowsPerPage={rowsPerPageModels}
          page={pageModels}
          onPageChange={handleChangePageModels}
          onRowsPerPageChange={handleChangeRowsPerPageModels}
        />
      </Paper>
    </Grid>
  );
};

export default EVModels;
