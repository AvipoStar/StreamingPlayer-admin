import axiosInstance from "../axios/axiosInstance";

export const getGenres = async () => {
  try {
    const response = await axiosInstance.get("/genre/");
    return response.data;
  } catch (error) {
    console.error("Error creating track:", error);
    throw error;
  }
};
