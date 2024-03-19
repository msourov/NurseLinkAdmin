import api from "./api";

export const patientHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/patient/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const doctorHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/doctor/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const nurseHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/nurse/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

export const remoteHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/remote/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const bedHelper = async (token) => {
  try {
    const response = await api(token).get("v1/margaret/bed/helper");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
