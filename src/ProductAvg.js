import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; //React Chart.js library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; //Necessary Chart.js components

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Helper function to calculate averages per quarter
function computeAverageByQuarter(data, product) {
  const quarters = [1, 2, 3, 4];
  const averages = {};

  // Loop through each quarter
  quarters.forEach((q) => {
    const filtered = data.filter(
      (item) => item.product_name === product && item.quarter === q
    );
    const total = filtered.reduce(
      (sum, item) => sum + parseInt(item.units_sold.toString().replace(/,/g, ""), 10),
      0
    );
    averages[q] = filtered.length ? Math.round(total / filtered.length) : 0;
  });

  return averages;
}

// States and component to display average sales by continent
export default function ProductAverage() {
  const [salesData, setSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("data/sales_data.json")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data);
        const uniqueProducts = [...new Set(data.map((item) => item.product_name))];
        setProducts(uniqueProducts);
      });
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      setChartData(null);
      return;
    }

    const averages = computeAverageByQuarter(salesData, selectedProduct);

    setChartData({
      labels: Object.keys(averages).map((q) => `Q${q}`),
      datasets: [
        {
          label: `Average Sales per Quarter for "${selectedProduct}"`,
          data: Object.values(averages),
          backgroundColor: "#4e73df",
        },
      ],
    });
  }, [selectedProduct, salesData]);

  return (
    <div>
      <h2>Average Sales by Product</h2>
      {/* Dropdown for continent selection */}
      <label>
        Select Product:{" "}
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Please Select</option>
          {products.map((product, idx) => (
            <option key={idx} value={product}>
              {product}
            </option>
          ))}
        </select>
      </label>

      {/* Render chart */}
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top", onClick: () => {} },
              title: { display: true, text: "Average Units Sold per Quarter" },
            },
          }}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Select a product to view the chart.</p>
      )}
    </div>
  );
}
