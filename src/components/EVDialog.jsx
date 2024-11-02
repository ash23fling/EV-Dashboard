import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const getRangeColor = (range) => {
  if (range > 250) return "#4caf50"; // Green for ranges > 250 miles
  if (range > 150) return "#ffeb3b"; // Yellow for ranges > 150 miles
  return "#f44336"; // Red for ranges <= 150 miles
};

const EVDialog = ({ open, handleClose, selectedMake, groupedData }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedMake}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {selectedMake && Object.keys(groupedData[selectedMake])
            .map((model) => ({
              model,
              maxRange: groupedData[selectedMake][model].maxRange,
            }))
            .sort((a, b) => b.maxRange - a.maxRange) // Sorted by max range.
            .map(({ model, maxRange }, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  className="dialog-card"
                  style={{
                    backgroundColor: getRangeColor(maxRange),
                  }}
                >
                  <CardContent>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Avatar>
                          <DirectionsCarIcon />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="h2">
                          {model}
                        </Typography>
                        <Typography variant="body2" component="p">
                        Max Range: {maxRange} miles
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EVDialog;
