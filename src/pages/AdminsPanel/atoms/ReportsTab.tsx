import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getReporAuthors } from "../logic/getReporAuthors";
import { getReporGenres } from "../logic/getReporGenres";
import { getReporPivotTable } from "../logic/getPivotRepor";
import { convertDate } from "../../../helpers/functions/convertDate";

const ReportsTab = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleGetPivotReport = async () => {
    if (!startDate || !endDate) {
      alert("Пожалуйста, выберите обе даты.");
      return;
    }
    const result = await getReporPivotTable(
      convertDate(startDate),
      convertDate(endDate)
    );
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
      <h2>Отчет по альбомам</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Выберите начальную дату"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Выберите конечную дату"
        />
      </div>
      <button onClick={handleGetPivotReport}>Скачать</button>
    </div>
  );
};

export default ReportsTab;
