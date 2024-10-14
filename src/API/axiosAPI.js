import { HttpClient } from "./core";

const axiosAPI = async (url) => {
  try {
    const response = await HttpClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default axiosAPI;
