import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Snackbar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Alert from '@mui/material/Alert';

const QueryForm = ({ handleRunQuery, handleClear }) => {
  const [query, setQuery] = useState('SELECT * FROM Customers;');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [queryHasRun, setQueryHasRun] = useState(false);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setQueryHasRun(false);
  };

  const handleRun = () => {
    if (query.trim() === '') {
      setShowErrorSnackbar(true);
    } else {
      setShowErrorSnackbar(false);
      handleRunQuery(query);
      setQueryHasRun(true);
    }
  };

  const handleClearClick = () => {
    setQuery('');
    handleClear();
    setQueryHasRun(false);
  };

  const handleCloseSnackbar = () => {
    setShowErrorSnackbar(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Enter your SQL query"
          variant="outlined"
          multiline
          rows={4}
          value={query}
          onChange={handleQueryChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleRun} startIcon={<PlayArrowIcon />} disabled={queryHasRun}>
            Run Query
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearClick}
            startIcon={<DeleteForeverOutlinedIcon />}
          >
            Clear
          </Button>
        </Box>
      </Grid>
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Please enter a valid SQL query.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default QueryForm;
