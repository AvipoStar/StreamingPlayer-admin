import React, { useState } from "react";
import { createAlbum, IAlbumData } from "../logic/setAlbum";
import { FileUploader } from "../../../ui/FileUploader/FileUploader";

export const AddAlbumForm = () => {
  const [albumData, setAlbumData] = useState<IAlbumData>({
    title: "",
    preview: null,
    release_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePreviewChange = (file: File) => {
    setAlbumData((prevData) => ({
      ...prevData,
      preview: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!albumData.preview) {
      alert("Please select a preview!");
      return;
    }

    try {
      const response = await createAlbum(albumData);
      console.log("Track created successfully:", response.data);
      alert("Track created successfully!");
    } catch (error) {
      console.error("Error creating track:", error);
      alert("Error creating track.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          name="title"
          value={albumData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Дата релиза:</label>
        <input
          type="date"
          name="release_date"
          value={albumData.release_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Превью:</label>
        <FileUploader onFileUpload={handlePreviewChange} required />
      </div>

      <button type="submit">Добавить альбом</button>
    </form>
  );
};
