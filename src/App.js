import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  CircularProgress,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Skeleton,
} from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import { executeSQLQuery } from './utils/utils';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import './assets/app.css';

const QueryForm = React.lazy(() => import('./components/QueryForm'));
const QueryResult = React.lazy(() => import('./components/QueryResult'));

const lightTheme = createTheme({
  palette: {
    type: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [queryResult, setQueryResult] = useState([]);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    setIsDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = isDarkMode ? lightTheme : darkTheme;

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = theme.palette.background.default;
    body.style.color = theme.palette.text.primary;
  }, [theme]);

  const handleRunQuery = async (query) => {
    try {
      setIsQueryRunning(true);
      const result = await executeSQLQuery(query);
      setQueryResult(result);
    } catch (error) {
      console.error('Error running SQL query:', error);
      setQueryResult([]);
    } finally {
      setIsQueryRunning(false);
    }
  };

  const handleClear = () => {
    setQueryResult([]);
  };

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="SQL Query Runner">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <TerminalIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SQL Query Runner
          </Typography>
          <IconButton color="inherit" onClick={handleThemeToggle}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>

        <Box mt={2} className='query-form-container'>
          <Suspense
            fallback={
              <Box>
              <Skeleton
                animation="wave"
                height={280}
                width="100%"
                style={{ marginBottom: 0 }}
              />
              <Skeleton
                animation="wave"
                height={80}
                width="20%"
              />
              </Box>
              
            }>
            <QueryForm handleRunQuery={handleRunQuery}  handleClear={handleClear}/>
          </Suspense>
        </Box>

        {isQueryRunning ? (
          <Box display="flex" justifyContent="center" mt={2} className='loader-container'>
            <CircularProgress />
          </Box>
        ) : (
          <Box mt={2} className='query-result-container'>
            <Suspense
              fallback={
                <Box sx={{ width: '100%' }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
            }>
              <QueryResult result={queryResult} />
            </Suspense>
          </Box>
        )}
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default App;
