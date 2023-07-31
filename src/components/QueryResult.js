import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  TablePagination,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const QueryResult = ({ result }) => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  if (!result || !result.length) {
    return null;
  }

  const headers = Object.keys(result[0]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(0);
  };

  const filteredResult = result.filter((row) => {
    const values = Object.values(row);
    return values.some((value) => String(value).toLowerCase().includes(searchValue.toLowerCase()));
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginationStartIndex = page * rowsPerPage;
  const paginationEndIndex = paginationStartIndex + rowsPerPage;
  const paginatedResult = filteredResult.slice(paginationStartIndex, paginationEndIndex);

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header}>{header.toUpperCase()}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((row, index) => (
              <StyledTableRow key={index}>
                {headers.map((header) => (
                  <StyledTableCell key={header}>{row[header]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={filteredResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default QueryResult;
