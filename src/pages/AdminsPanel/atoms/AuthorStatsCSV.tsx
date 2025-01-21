import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { saveAs } from "file-saver";
import { getAuthors } from "../logic/getAuthors";
import axiosInstance from "../../../helpers/axios/axiosInstance";

const AuthorStatsCSVDownloader: React.FC = () => {
  const [authors, setauthors] = useState<any[]>([]);

  const [authorId, setAuthorId] = useState<number | null>(null);
  const [period, setPeriod] = useState<string | null>(null);

  const periodOptions = [
    { value: "day", label: "За день" },
    { value: "week", label: "За неделю" },
    { value: "month", label: "За месяц" },
    { value: "half_year", label: "За полгода" },
    { value: "year", label: "За год" },
  ];

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const result = await getAuthors();
    if (result) setauthors(result);
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get("/admin/getAuthorStatsCSV", {
        params: { author_id: authorId, period },
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      saveAs(blob, "author_stats.csv");
    } catch (error) {
      console.error("Ошибка загрузки CSV файла:", error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Введите ID автора: </label>
        {/* <input
          type="number"
          value={authorId || ""}
          onChange={(e) => setAuthorId(Number(e.target.value))}
          placeholder="ID автора"
        /> */}

        <Select
          options={authors.map((a) => {
            return { value: a.id, label: a.nickname };
          })}
          onChange={(selectedOption: any) => setAuthorId(selectedOption?.value)}
          placeholder="ID автора"
          isClearable
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Выберите период: </label>
        <Select
          options={periodOptions}
          onChange={(selectedOption: any) => setPeriod(selectedOption?.value)}
          placeholder="Выберите период"
          isClearable
        />
      </div>
      <button onClick={handleDownload} disabled={!authorId || !period}>
        Скачать CSV
      </button>
    </div>
  );
};

export default AuthorStatsCSVDownloader;
