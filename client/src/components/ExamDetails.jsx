import React from "react";
import Chart from "react-apexcharts";

const ExamDetails = () => {
  const averageScores = {
    options: {
      chart: {
        id: "average-scores",
        type: "bar",
      },
      xaxis: {
        categories: ["Students", "Teachers"],
      },
    },
    series: [
      {
        name: "Average Scores",
        data: [85, 90],
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Exam Details Overview</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Scores</h2>
        <Chart options={averageScores.options} series={averageScores.series} type="bar" />
      </div>
    </div>
  );
};

export default ExamDetails;
