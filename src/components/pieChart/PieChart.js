import React, { useEffect, useState } from 'react';
import './PieChart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const [PieChartData, SetPieChartData] = useState({
        labels: ['a','v','c'],
        datasets: [
          {
            data: [1,2,3],
            backgroundColor: [
              "rgba(255,99,132,255)",
              "rgba(75,193,193,255)",
              "rgba(54,163,234,255)",
             
            ],
          },
        ],
      });
      useEffect(() => {
        fetch('http://localhost:8001/topCustomerData')
          .then((response) => response.json())
          .then((data) => {
            const chartLabel = [];
            const chartData = [];
            data.forEach((element) => {
              chartLabel.push(element.customer_name);
              chartData.push(element.order_total_amount);
            });
            SetPieChartData({
              labels: chartLabel,
              datasets: [
                {
                  data: chartData,
                  backgroundColor: [
                    "rgba(255,99,132,255)",
                    "rgba(75,193,193,255)",
                    "rgba(54,163,234,255)",
                   
                  ],
                },
              ],
            });
          })
          .catch(error => console.log(error))
      }, []);
  return (
    <div className="DoughnutChart">
    <strong><p>Category wise sold products and it's quantity</p></strong>
    <div
      className="d-flex justify-content-center"
      style={{ height: '380px' }}
    >
    <Pie data={PieChartData} />  
    </div>
  </div>
  )
}