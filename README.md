# Sales Dashboard Project

## Overview

This project is a Sales Dashboard application that tracks and visualizes quarterly sales data for a manufacturer exporting products across multiple continents. The data is stored in a MySQL database, extracted and converted to JSON via a Java program, and displayed in a React frontend with interactive charts.

---

## Features

- **Data Storage**: MySQL database stores sales, product, time, and continent data in a normalized schema.
- **Data Extraction**: Java program connects to the database, retrieves sales data with related info, and outputs JSON files.
- **React Frontend**:
  - Home page displays raw sales data in a table.
  - Separate pages show average sales per quarter:
    - By Product
    - By Continent
  - Interactive bar charts visualize the averages.
- Dark, modern UI styling with responsive design.

---

## Technologies Used

- **Backend**: Java (JDBC), MySQL
- **Frontend**: React, Chart.js (via react-chartjs-2), React Router
- **Data Format**: JSON files for frontend consumption

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Java JDK installed
- MySQL server running locally or remotely

### Setup Instructions

After cloning the repository:

```bash
# 1. Install frontend dependencies
npm install

# 2. Compile and run the Java data extractor
# (Make sure to adjust database credentials in json.java if needed)
javac -cp "lib/json-20230227.jar;lib/mysql-connector-j-9.3.0.jar" src/json.java
java -cp "lib/json-20230227.jar;lib/mysql-connector-j-9.3.0.jar;src" json

# 3. Ensure the generated sales_data.json is placed in the React app's public/data/ directory

# 4. Start the React development server
npm start

