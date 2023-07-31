# SQL Editor

This is a simple SQL editor web application built using React and Material-UI (MUI). The editor allows users to enter SQL queries in the input area, execute the queries (dummy as of now), and view the results in a table format in the result area.

## Demo Link: https://sk044-sql-editor.netlify.app/

## Overview

The SQL editor consists of two main parts:

1. **Input Area**: Users can enter their SQL queries in a multi-line text field. The editor provides a "Run Query" button to execute the entered query and a "Clear" button to clear the input area.

2. **Result Area**: The executed SQL query results are displayed in a table format. The table includes headers based on the selected columns from the data. The table is styled using MUI components to provide a clean and user-friendly interface. This area also includes a search area to search for keywords in the table.

## JavaScript Framework and Packages

- **React**: The project is built using the React JavaScript framework, which provides a component-based architecture for building user interfaces.

- **Material-UI (MUI)**: MUI is used for creating a consistent and visually appealing design for the web application. It provides a set of pre-built components and styles that are customizable and easy to use.

- **@emotion/react**: This package is used for styling components in a more efficient and organized way using Emotion, which is a popular CSS-in-JS library.

- **@mui/icons-material**: This package provides a collection of Material-UI icons that we can use to enhance the user interface with meaningful and visually appealing icons.

- **axios**: Axios is used to make HTTP requests, specifically for fetching the CSV data used in the application.

- **papaparse**: Papaparse is used to parse the fetched CSV data into a usable format for executing the SQL queries.

## Page Load Time and Performance

The page load time of the application was measured using various browser developer tools and performance monitoring tools. However, it's important to note that the load time may vary depending on the user's internet connection and device.

To optimize the load time and increase performance, the following measures were taken:

1. **Asynchronous Data Fetching**: The CSV data is fetched asynchronously using Axios, which helps prevent blocking the main thread and ensures a smoother user experience.

2. **Lazy Loading**: Components are loaded lazily to reduce the initial bundle size and improve the application's load time.

3. **Snackbar for Error Handling**: To handle empty queries, a Snackbar component is used to display an error alert, which allows users to quickly see if there is an issue with their input.

4. **Theme Switching**: The application supports light and dark themes using Material-UI's theming feature. This allows users to choose their preferred theme, and the selection is persisted across sessions using local storage.

Overall, these optimization techniques help enhance the user experience and make the SQL editor faster and more efficient. The application strives to provide a smooth and user-friendly environment for writing and executing SQL queries.
