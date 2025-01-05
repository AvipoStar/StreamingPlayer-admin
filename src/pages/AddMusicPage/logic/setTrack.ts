import { uploadFile } from "../../../helpers/api/uploadFile";
import axiosInstance from "../../../helpers/axios/axiosInstance";

export interface ITrackData {
  title: string;
  description: string;
  album_id: number;
  genre_ids: number[];
  file: File | null;
  preview: File | null;
}

export const createTrack = async (trackData: ITrackData) => {
  const token = localStorage.getItem("access_token"); // Получаем токен из localStorage
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    if (trackData.file) {
      const file_path = await uploadFile(trackData.file);

      let preview_path = null;
      if (trackData.preview) {
        preview_path = await uploadFile(trackData.preview);
      }

      const response = await axiosInstance.post(
        "/mediaItem/",
        {
          title: trackData.title,
          description: trackData.description,
          album_id: trackData.album_id,
          genre_ids: trackData.genre_ids,
          file_path: file_path,
          preview_path: preview_path,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } else {
      throw new Error("File is required");
    }
  } catch (error) {
    console.error("Error creating track:", error);
    throw error;
  }
};
