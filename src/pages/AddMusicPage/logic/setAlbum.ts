import { uploadFile } from "../../../helpers/api/uploadFile";
import axiosInstance from "../../../helpers/axios/axiosInstance";

export interface IAlbumData {
  id?: number
  title: string;
  preview: File | null;
  release_date: string;
}

export const createAlbum = async (trackData: IAlbumData) => {
  const token = localStorage.getItem("access_token"); // Получаем токен из localStorage
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    if (trackData.preview) {
      const preview_path = await uploadFile(trackData.preview);

      if (preview_path) {
        const response = await axiosInstance.post(
          "/album/",
          {
            title: trackData.title,
            preview_url: preview_path,
            release_date: trackData.release_date
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      }
    }
  } catch (error) {
    console.error("Error creating track:", error);
    throw error;
  }
};
