import axios from 'axios';
import { parse } from 'papaparse';
import { CSV_DATA } from './constants';

export const getCSVData = async () => {
  try {
    const response = await axios.get(CSV_DATA, {
      responseType: 'text',
    });

    const { data } = parse(response.data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    return data;
  } catch (error) {
    console.error('Error fetching and parsing CSV data:', error);
    return [];
  }
};

export const executeSQLQuery = async (query) => {
  try {
    const data = await getCSVData();
    // alteration functions to use sql queries - [future scopes]
    return data;
    
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return [];
  }
};
