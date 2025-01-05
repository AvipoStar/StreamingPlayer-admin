import React, { useEffect, useState } from "react";
import { createTrack, ITrackData } from "../logic/setTrack";
import Select from "react-select";
import { IGenre } from "../../../helpers/redux/slices/genresSlice";
import { useSelector } from "react-redux";
import { getAuthorAlbums } from "../logic/albums";
import { IUser } from "../../../helpers/redux/slices/userSlice";

export const AddTrackForm = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const genres: IGenre[] = useSelector((state: any) => state.genres);
  const userSelector: IUser = useSelector((state: any) => state.user);

  const [trackData, setTrackData] = useState<ITrackData>({
    title: "",
    description: "",
    album_id: -1,
    genre_ids: [],
    file: null,
    preview: null,
  });

  useEffect(() => {
    const fetchAlbums = async (author_id: number) => {
      const result = await getAuthorAlbums(author_id);
      if (result) setAlbums(result);
    };
    if (userSelector.userId) fetchAlbums(userSelector.userId);
  }, [userSelector]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreChange = (selectedOption: any) => {
    setTrackData({
      ...trackData,
      genre_ids: selectedOption.map((so: any) => so.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackData.file) {
      alert("Please select a file!");
      return;
    }

    console.log("trackData", trackData);

    try {
      const response = await createTrack(trackData);
      console.log("Track created successfully:", response);
      alert("Track created successfully!");
    } catch (error) {
      console.error("Error creating track:", error);
      alert("Error creating track.");
    }
  };

  const getGenresOptions = () => {
    let genresOptions: any[] = [];
    genres?.map((g) => {
      genresOptions.push({ value: g.id, label: g.name });
    });
    return genresOptions;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          name="title"
          value={trackData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Текст/Описание:</label>
        <textarea
          name="description"
          value={trackData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Альбом:</label>
        <Select
          options={albums.map((a) => {
            return { value: a.id, label: a.title };
          })}
          onChange={(array) =>
            setTrackData({ ...trackData, album_id: array?.value })
          }
        />
      </div>
      <div>
        <label>Жанры:</label>
        <Select
          options={getGenresOptions()}
          onChange={(selectedOptions) => handleGenreChange(selectedOptions)}
          required
          isMulti
        />
      </div>

      <div>
        <label>Превью:</label>
        <input
          type="file"
          onChange={(e) =>
            setTrackData({
              ...trackData,
              preview: e.target.files && e.target.files[0],
            })
          }
        />
      </div>
      <div>
        <label>Файл трэка:</label>
        <input
          type="file"
          onChange={(e) =>
            setTrackData({
              ...trackData,
              file: e.target.files && e.target.files[0],
            })
          }
          required
        />
      </div>
      <button type="submit">Добавить трэк</button>
    </form>
  );
};
