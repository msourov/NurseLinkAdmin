import api from "./api";

export const floorHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/floor/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
