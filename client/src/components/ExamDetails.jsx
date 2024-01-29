import React, { useState } from "react";
import Chart from "react-apexcharts";

const ExamDetails = () => {
  // Example data for individual student performance
  const [studentPerformanceData, setStudentPerformanceData] = useState({
    name: "Safia Yussuf",
    subjects: ["Math", "Science", "English"],
    scores: [90, 85, 92],
  });

  const studentPerformanceChart = {
    options: {
      chart: {
        id: "individual-performance",
        type: "bar",
      },
      xaxis: {
        categories: studentPerformanceData.subjects,
      },
    },
    series: [
      {
        name: "Scores",
        data: studentPerformanceData.scores,
      },
    ],
  };

  // Average Scores Data
  const averageScoresData = {
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

  // Top Performers Data
  const topPerformersData = {
    options: {
      chart: {
        id: "top-performers",
        type: "radar",
      },
      xaxis: {
        categories: ["Knowledge", "Communication", "Creativity", "Teamwork"],
      },
    },
    series: [
      {
        name: "Top Performers",
        data: [95, 92, 88, 90],
      },
    ],
  };

  // Trends Data
  const trendsData = {
    options: {
      chart: {
        id: "trends",
        type: "line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar"],
      },
    },
    series: [
      {
        name: "Trend Data",
        data: [50, 65, 80],
      },
    ],
  };

  return (
    <div className="p-4">
      {/* Individual Student Performance Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{`${studentPerformanceData.name}'s Performance`}</h1>
        <div className="border p-4 rounded-md bg-white shadow-md mb-4">
          <Chart
            options={studentPerformanceChart.options}
            series={studentPerformanceChart.series}
            type="bar"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Detailed Scores</h2>
          <ul>
            {studentPerformanceData.subjects.map((subject, index) => (
              <li key={index}>
                <strong>{subject}:</strong> {studentPerformanceData.scores[index]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exam Details Overview Section */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Exam Details Overview</h1>

        {/* Average Scores Chart */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Average Scores</h2>
          <Chart options={averageScoresData.options} series={averageScoresData.series} type="bar" />
        </div>

        {/* Top Performers Chart */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Top Performers</h2>
          <Chart options={topPerformersData.options} series={topPerformersData.series} type="radar" />
        </div>

        {/* Trends Chart */}
        <div>
          <h2 className="text-xl font-semibold">Trends</h2>
          <Chart options={trendsData.options} series={trendsData.series} type="line" />
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
