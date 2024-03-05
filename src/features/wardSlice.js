import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";
import { useSelector } from "react-redux";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const fetchWard = createAsyncThunk(
  "wardSlice/fetchWard",
  async (token) => {
    try {
      const response = await api(token).get("v1/margaret/ward/all");
      if (response.status === 200) {
        // console.log("fetchWard", JSON.stringify(response.data, undefined, 2));
        return response.data;
      } else {
        throw new Error("Failed to fetch wards");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const createWard = createAsyncThunk(
  "wardSlice/createWard",
  async ({ token, name, floor_uid, active }) => {
    try {
      const response = await api(token).post("v1/margaret/ward/create", {
        name: name,
        floor_uid: floor_uid,
        active: active,
      });

      if (response.status === 201) {
        // console.log(
        //   "selector wards",
        //   useSelector((state) => state.wards)
        // );
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create Ward");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const updateWard = createAsyncThunk(
  "wardSlice/updateWard",
  async ({ token, name, uid, floor_uid, active }) => {
    try {
      const response = await api(token).put("v1/margaret/ward/update", {
        name,
        uid,
        floor_uid,
        active,
      });
      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update ward");
      }
    } catch (error) {
      // console.log(error.response);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const deleteWard = createAsyncThunk(
  "wardSlice/deleteWard",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(
        `v1/margaret/ward/delete/${uid}`
      );
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete ward");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const wardSlice = createSlice({
  name: "wardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWard.fulfilled, (state, action) => {
        state.status = "idle";
        state.wards = action.payload.data;
      })
      .addCase(fetchWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWard.fulfilled, (state, action) => {
        state.status = "idle";
        state.wards.push(action.payload.data);
      })
      .addCase(createWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWard.fulfilled, (state, action) => {
        state.status = "idle";
        const updateWardIndex = state.wards.findIndex(
          (ward) => ward.uid === action.payload.uid
        );
        if (updateWardIndex !== -1) {
          state.wards[updateWardIndex] = action.payload;
        }
      })
      .addCase(updateWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWard.fulfilled, (state, action) => {
        state.status = "idle";
        state.wards = state.wards.filter(
          (ward) => ward.uid !== action.payload.uid
        );
      })
      .addCase(deleteWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getWards = (state) => state.wards;
export default wardSlice.reducer;
