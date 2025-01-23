import React from "react";
import { useNavigate } from "react-router";
import { getReporAuthors } from "../logic/getReporAuthors";
import { getReporGenres } from "../logic/getReporGenres";

const ReportsTab = () => {
  const navigate = useNavigate();

  const handleGetReportAuthors = async () => {
    const result = await getReporAuthors();
    if (result) {
      navigate("/report", { state: { reportHTML: result } });
    }
  };

  const handleGetReportGenres = async () => {
    const result = await getReporGenres();
    if (result) {
      navigate("/report", { state: { reportHTML: result } });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Отчет по авторам</h2>
      <button onClick={handleGetReportAuthors}>Скачать</button>
      <h2>Отчет по жанрам</h2>
      <button onClick={handleGetReportGenres}>Скачать</button>
    </div>
  );
};

export default ReportsTab;
