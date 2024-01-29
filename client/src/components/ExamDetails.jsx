import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const ExamDetails = () => {
  const averageScores = {
    students: 85,
    teachers: 90,
    parents: 75,
  };

  const topPerformers = [
    { name: "Student A", score: 95 },
    { name: "Teacher B", score: 92 },
    { name: "Parent C", score: 88 },
  ];

  const trendData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 80 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Exam Details Overview</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Scores</h2>
        <Bar data={averageScores} />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Top Performers</h2>
        <Pie data={topPerformers} />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Trends</h2>
        <Line data={trendData} />
      </div>
    </div>
  );
};

export default ExamDetails;
