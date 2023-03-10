import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./DoughnutChart.css";
import RingLoader from "react-spinners/RingLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const [categoryId, SetCategoryId] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [DoughnutChartData, SetDoughnutChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    setShowLoader(true);
    fetch(
      `https://agrigate-service.onrender.com/categoryWiseData/${categoryId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const chartLabel = []; // creating empty array to doughnut chart labels
        const chartData = []; // creating empty array to doughnut chart data
        data.forEach((element) => {
          chartLabel.push(element.product_name);
          chartData.push(element.quantity);
        });
        SetDoughnutChartData({
          labels: chartLabel,
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        setShowLoader(false);
      })
      .catch((error) => console.log(error));
  }, [categoryId]);
  const handleCategoryChange = (e) => {
    SetCategoryId(e.target.value);
  };

  return (
    <div className="DoughnutChart">
      <strong>
        <p>Category wise sold products and it's quantity</p>
      </strong>
      <select
        name="category"
        onChange={handleCategoryChange}
        className="CategorySelect"
      >
        <option value="1">Apparel</option>
        <option value="2">Footwear</option>
        <option value="3">Formal wear</option>
      </select>
      <div
        className="d-flex justify-content-center"
        style={{ height: "380px" }}
      >
        {showLoader ? (
          <RingLoader
            className="align-self-center"
            loading={showLoader}
            aria-label="Loading Spinner"
          />
        ) : (
          <Doughnut data={DoughnutChartData} />
        )}
      </div>
    </div>
  );
}
