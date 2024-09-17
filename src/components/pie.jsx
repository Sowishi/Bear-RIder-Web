import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import moment from "moment";
import useCrudTransactions from "../hooks/useCrudTransaction";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data: transactions } = useCrudTransactions();

  const getPieData = () => {
    const output = {
      Transportation: 0,
      Delivery: 0,
    };

    transactions.map((item) => {
      if (item.serviceType == "Padara") {
        output.Delivery += 1;
      } else {
        output.Transportation += 1;
      }
    });

    const data = {
      label: [],
      data: [],
    };

    for (const key in output) {
      data.label.push(key);
      data.data.push(output[key]);
    }

    return data;
  };

  const chartData = {
    datasets: [
      {
        data: getPieData().data,
        backgroundColor: ["#F4CB52", "#C81E1E"],
        hoverOffset: 4,
      },
    ],
    labels: getPieData().label,
  };

  const options = {
    responsive: true,
  };

  return (
    <Doughnut
      style={{ width: 200, height: 200 }}
      data={chartData}
      options={options}
    />
  );
};

export default PieChart;
