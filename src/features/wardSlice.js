import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const fetchWard = createAsyncThunk("wardSlice/fetchWard", async () => {
  try {
    const response = await api().get("v1/margaret/ward/all");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createWard = createAsyncThunk("wardSlice/createWard", async () => {
  try {
    const response = await api().post("v1/margaret/ward/create", {
      name: name,
      floor_no: floor_no,
      floor_uid: floor_uid,
      active: active,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateWard = createAsyncThunk("wardSlice/updateWard", async () => {
  try {
    const response = await api().put("v1/margaret/ward/update");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
