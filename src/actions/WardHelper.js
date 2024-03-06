import api from "./api";

export const wardHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/ward/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
