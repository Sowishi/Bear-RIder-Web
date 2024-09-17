import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useCrudTransactions from "../hooks/useCrudTransaction";
import moment from "moment";

// Register the components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ currentFormat }) => {
  const { data: transactions } = useCrudTransactions();

  const getDailyData = () => {
    const output = {};
    transactions.map((item) => {
      const day = moment(item.createdAt.toDate()).format("YYYY-MM-DD");

      if (output[day]) {
        output[day] += parseFloat(item.totalPrice);
      } else {
        output[day] = parseInt(item.totalPrice);
      }
    });

    const data = {
      date: [],
      price: [],
    };

    for (const key in output) {
      data.date.push(moment(key).format("LL"));
      data.price.push(output[key]);
    }

    return data;
  };

  const getMonthlyData = () => {
    const output = {};
    transactions.map((item) => {
      const month = moment(item.createdAt.toDate()).format("MMMM");
      if (output[month]) {
        output[month] += parseFloat(item.totalPrice);
      } else {
        output[month] = parseFloat(item.totalPrice);
      }
    });

    const data = {
      date: [],
      price: [],
    };

    for (const key in output) {
      data.date.push(key);
      data.price.push(output[key]);
    }
    return data;
  };

  const data = {
    labels:
      currentFormat == "daily" ? getDailyData().date : getMonthlyData().date,
    datasets: [
      {
        label: "Rider Sales",
        data:
          currentFormat == "daily"
            ? getDailyData().price
            : getMonthlyData().price, // Your data here
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1, // Smoothing the line
      },
    ],
  };

  // Configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };

  return (
    <div className="shadow-lg p-5 mx-3">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
