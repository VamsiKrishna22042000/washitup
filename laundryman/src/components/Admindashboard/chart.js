import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export function OrderChart({data}) {

  if(data){
    console.log(data,"dat")
  }

  const pieChartData = {
    labels: ['Total Orders', 'Completed Orders'],
    datasets: [
      {
        label: '# of Orders',
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
