import React, { useEffect, useState } from "react";

function Home() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("data/sales_data.json")
      .then((res) => res.json())
      .then((data) => setSalesData(data));
  }, []);

  return (
    <div>
      <h2>All Sales Data</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Quarter</th>
            <th>Year</th>
            <th>Continent</th>
            <th>Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, i) => (
            <tr key={i}>
              <td>{item.sku}</td>
              <td>{item.product_name}</td>
              <td>{item.quarter}</td>
              <td>{item.year}</td>
              <td>{item.continent}</td>
              <td>{item.units_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
