import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";

const initialState = {
  floors: [],
  status: "idle",
  error: null,
};

export const fetchFloor = createAsyncThunk("floorSlice/fetchFloor", async () => {
    try {
        const response = await api().get('v1/margaret/floor/all')
    }
})