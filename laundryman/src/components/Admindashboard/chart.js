import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

export function OrderChart({ data }) {
  if (data) {
    console.log(data, "dat");
  }

  let labels = [];
  let backgroundColor = [];
  let borderColor = [];

  if (data.totalOrders) {
    labels.push("Total Orders");
    backgroundColor.push("rgba(255, 99, 132, 0.7)"); // Color for Total Orders
    borderColor.push("rgba(255, 99, 132, 1)");
  }

  if (data.completedOrdersCount) {
    labels.push("Completed Orders");
    backgroundColor.push("rgba(54, 162, 235, 0.7)"); // Color for Completed Orders
    borderColor.push("rgba(54, 162, 235, 1)");
  }

  if (data.totalRevenue) {
    labels.push("Total Revenue");
    backgroundColor.push("rgba(75, 192, 192, 0.7)"); // Color for Total Revenue
    borderColor.push("rgba(75, 192, 192, 1)");
  }

  if (data.todayRevenue) {
    labels.push("Today Revenue");
    backgroundColor.push("rgba(255, 205, 86, 0.7)"); // Color for Today Revenue
    borderColor.push("rgba(255, 205, 86, 1)");
  }

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        // label: '# of Data',
        data: [
          data.totalOrders || data.totalRevenue,
          data.completedOrdersCount || data.todayRevenue,
        ],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Pie data={pieChartData} options={chartOptions} />;
}
