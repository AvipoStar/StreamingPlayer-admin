import React from "react";
import "./FileUploader.css";

import plusIcon from "../../assets/icons/plus.svg";

interface FileUploaderProps {
  required: boolean;
  file: File | null;
  onFileUpload: (file: File | null) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  required,
  file,
  onFileUpload,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    console.log('selectedFile', selectedFile)

    onFileUpload(selectedFile);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        id="file-input"
        className="file-input"
        onChange={handleFileChange}
        required={required}
      />
      <label htmlFor="file-input" className="file-label">
        <img className="plus-icon" src={plusIcon} alt="Upload Icon" />
        <span className="file-text">
          {file ? file.name : "Перетащите или загрузите файлы"}
        </span>
      </label>
    </div>
  );
};
