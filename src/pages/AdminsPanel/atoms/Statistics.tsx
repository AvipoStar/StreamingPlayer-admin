import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Select from "react-select";
import { getAuthorStatistics } from "../logic/getAuthorStatistics";
import Spinner from "../../../ui/Spinner/Spinner";
import axiosInstance from "../../../helpers/axios/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AuthorStatsChart: React.FC = () => {
  const [authorStats, setAuthorStats] = useState<any[]>([]);
  const [genreStats, setGenreStats] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<string | null>(null);

  const periodOptions = [
    { value: "day", label: "За день" },
    { value: "week", label: "За неделю" },
    { value: "month", label: "За месяц" },
    { value: "half_year", label: "За полгода" },
    { value: "year", label: "За год" },
  ];

  useEffect(() => {
    const fetchAuthorStats = async () => {
      try {
        const response = await getAuthorStatistics(period);
        if (response) setAuthorStats(response);
      } catch (err) {
        console.log("Failed to fetch author statistics.");
      } finally {
        setLoading(false);
      }
    };

    const fetchGenreStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/getGenreStatistic");
        setGenreStats(response.data);
      } catch (err) {
        console.log("Failed to fetch genre statistics.");
      }
    };

    const fetchUserStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/getUserListenCount");
        setUserStats(response.data);
      } catch (err) {
        console.log("Failed to fetch user statistics.");
      }
    };

    fetchAuthorStats();
    fetchGenreStats();
    fetchUserStats();
  }, [period]);

  const authorData = {
    labels: authorStats.map((stat) => stat.author_name),
    datasets: [
      {
        label: "Количество треков",
        data: authorStats.map((stat) => stat.total_listens),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const genreData = {
    labels: genreStats.map((stat) => stat.genre),
    datasets: [
      {
        label: "Количество прослушиваний",
        data: genreStats.map((stat) => stat.listen_count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const userData = {
    labels: userStats.map((stat) => stat.user_name),
    datasets: [
      {
        label: "Количество прослушиваний",
        data: userStats.map((stat) => stat.listen_count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const author_options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Статистика прослушиваний авторов",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const genre_options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Статистика прослушиваний жанров",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const user_options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Статистика прослушиваний пользователей",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Выберите период: </label>
        <Select
          options={periodOptions}
          onChange={(selectedOption: any) => setPeriod(selectedOption?.value)}
          placeholder="Выберите период"
          isClearable
        />
      </div>
      {loading && <Spinner />}
      <div style={{ height: "500px", marginBottom: "20px" }}>
        {authorStats.length > 0 ? (
          <Bar data={authorData} options={author_options} />
        ) : (
          <div>Данные не найдены</div>
        )}
      </div>
      <div style={{ height: "500px", marginBottom: "20px" }}>
        {genreStats.length > 0 ? (
          <Bar data={genreData} options={genre_options} />
        ) : (
          <div>Данные не найдены</div>
        )}
      </div>
      <div style={{ height: "500px" }}>
        {userStats.length > 0 ? (
          <Bar data={userData} options={user_options} />
        ) : (
          <div>Данные не найдены</div>
        )}
      </div>
    </div>
  );
};

export default AuthorStatsChart;
