import axiosInstance from "../axios/axiosInstance";

export const search = async (searchString: string) => {
  try {
    const response = await axiosInstance.get(`/search/${searchString}`);
    return response.data;
  } catch (error) {
    console.error("Error creating track:", error);
    throw error;
  }
};
