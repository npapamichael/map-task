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
function computeAverageByQuarter(data, continent) {
  const quarters = [1, 2, 3, 4];
  const averages = {};

  quarters.forEach((q) => {
    const filtered = data.filter(
      (item) => item.continent === continent && item.quarter === q
    );
    const total = filtered.reduce(
      (sum, item) => sum + parseInt(item.units_sold.toString().replace(/,/g, ""), 10),
      0
    );
    averages[q] = filtered.length ? Math.round(total / filtered.length) : 0;
  });

  return averages;
}

export default function ContinentAverage() {
  const [salesData, setSalesData] = useState([]);
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("data/sales_data.json")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data);
        const uniqueContinents = [...new Set(data.map((item) => item.continent))];
        setContinents(uniqueContinents);
      });
  }, []);

  useEffect(() => {
    if (!selectedContinent) {
      setChartData(null);
      return;
    }

    const averages = computeAverageByQuarter(salesData, selectedContinent);

    setChartData({
      labels: Object.keys(averages).map((q) => `Q${q}`),
      datasets: [
        {
          label: `Average Sales per Quarter for "${selectedContinent}"`,
          data: Object.values(averages),
          backgroundColor: "#1cc88a",
        },
      ],
    });
  }, [selectedContinent, salesData]);

  return (
    <div>
      <h2>Average Sales by Continent</h2>
      <label>
        Select Continent:{" "}
        <select
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          <option value="">Please Select</option>
          {continents.map((continent, idx) => (
            <option key={idx} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </label>

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
        <p style={{ marginTop: "2rem" }}>Select a continent to view the chart.</p>
      )}
    </div>
  );
}
