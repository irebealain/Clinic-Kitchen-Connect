import React, {useEffect, useState} from 'react'
import axiosInstance from '../axiosInstance';
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const Charts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);
  const fetchDataGraphs = async () => {
    try {
      const [prescriptionsResponse, specialFoodsResponse, studentsResponse] = await Promise.all([
        axiosInstance.get("/api/prescriptions/"),
        axiosInstance.get("/api/special-foods/"),
        axiosInstance.get("/api/students/"),
      ]);
      const prescriptionsCount = prescriptionsResponse.data.length;
      const specialFoodsCount = specialFoodsResponse.data.length;
      const studentsCount = studentsResponse.data.length;
      const data = {
        labels: ["Prescriptions", "Special Foods", "Students"], // Labels for the chart
        datasets: [
          {
            label: "Counts",
            data: [prescriptionsCount, specialFoodsCount, studentsCount], // Data values
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)", // Colors for prescriptions
              "rgba(54, 162, 235, 0.7)", // Colors for special foods
              "rgba(75, 192, 192, 0.7)", // Colors for students
            ],
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching chart data:", error);
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading chart...</div>;
  }
  return (
    <div className="w-full md:w-1/2 mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Data Overview</h2>
      <PolarArea data={chartData} />
    </div>
  )
}

export default Charts
