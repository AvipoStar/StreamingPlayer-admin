import React from "react";
import { useLocation } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const reportHTML = location.state?.reportHTML;

  const handleDownload = () => {
    const blob = new Blob([reportHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {reportHTML ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: reportHTML }}></div>
          <button onClick={handleDownload}>Скачать отчет</button>
        </>
      ) : (
        <p>Отчет не найден.</p>
      )}
    </div>
  );
};

export default ReportPage;
