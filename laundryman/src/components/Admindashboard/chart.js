import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export function OrderChart({ data }) {
  const pieChartData = {
    labels: ['Total Orders', 'Completed Orders'],
    datasets: [
      {
        label: '', // Empty string for the legend label
        data: [data.totalOrders, data.activeOrdersCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', // Color for Total Orders
          'rgba(54, 162, 235, 0.7)', // Color for Completed Orders
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const ds = data.datasets[0];
                const arc = meta.data[i];
                const value = ds.data[i];
                const percentage = ((value / ds.data.reduce((acc, val) => acc + val)) * 100).toFixed(1);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: ds.backgroundColor[i],
                  strokeStyle: ds.borderColor[i],
                  lineWidth: ds.borderWidth,
                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                 
                };
              });
            }
            return [];
          },
        },
      },
    },
  };



  return <Pie data={pieChartData} options={chartOptions}  />;
}





























// import React, { useEffect, useRef } from 'react';
// import { Doughnut } from 'react-chartjs-2';

// const OrderPieChart = ({ totalOrders, completedOrders }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       // Destroy the existing Chart instance, if it exists
//       if (chartRef.current.chartInstance) {
//         chartRef.current.chartInstance.destroy();
//       }

//       // Create a new Chart instance
//       chartRef.current.chartInstance = new Doughnut(chartRef.current, {
//         data: {
//           labels: ['Total Orders', 'Completed Orders'],
//           datasets: [
//             {
//               data: [totalOrders, completedOrders],
//               backgroundColor: ['#FF6384', '#36A2EB'],
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//         },
//       });
//     }
//   }, [totalOrders, completedOrders]);

//   return <canvas ref={chartRef} />;
// };

// export default OrderPieChart;
