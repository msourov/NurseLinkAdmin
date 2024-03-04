import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";

const initialState = {
  floors: [],
  status: "idle",
  error: null,
};

export const fetchFloor = createAsyncThunk(
  "floorSlice/fetchFloor",
  async (token) => {
    try {
      const response = await api(token).get("v1/margaret/floor/all");
      if (response.status === 200) {
        // console.log("fetchFloor", JSON.stringify(response.data, undefined, 2));
        return response.data;
      } else {
        throw new Error("Failed to fetch floor");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const createFloor = createAsyncThunk(
  "floorSlice/createFloor",
  async ({ token, name, floor_no, active }) => {
    // console.log(name, floor_no, active);
    try {
      const response = await api(token).post("v1/margaret/floor/create", {
        name: name,
        floor_no: floor_no,
        active: active,
      });
      if (response.status === 201) {
        // console.log(response);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create floor");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const updateFloor = createAsyncThunk(
  "floorSlice/updateFloor",
  async ({ token, values, toggleEditModal }) => {
    const { name, floor_no, active, uid } = values;
    let response;
    try {
      response = await api(token).put("v1/margaret/floor/update", {
        name: name,
        floor_no: floor_no,
        active: active,
        uid: uid,
      });

      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update floor");
      }
    } catch (error) {
      // console.log(error.response);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deleteFloor = createAsyncThunk(
  "floorSlice/deleteFloor",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(
        `v1/margaret/floor/delete/${uid}`
      );
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete floor");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const floorSlice = createSlice({
  name: "floorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFloor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFloor.fulfilled, (state, action) => {
        state.status = "idle";
        state.floors = action.payload.data;
      })
      .addCase(fetchFloor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createFloor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFloor.fulfilled, (state, action) => {
        state.status = "idle";
        state.floors.push(action.payload.data);
      })
      .addCase(createFloor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateFloor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFloor.fulfilled, (state, action) => {
        state.status = "idle";
        const updateFloorIndex = state.floors.findIndex(
          (floor) => floor.uid === action.payload.uid
        );
        if (updateFloorIndex !== -1) {
          state.floors[updateFloorIndex] = action.payload;
        }
      })
      .addCase(updateFloor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteFloor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFloor.fulfilled, (state, action) => {
        state.status = "idle";
        state.floors = state.floors.filter(
          (floor) => floor.uid !== action.payload.uid
        );
      })
      .addCase(deleteFloor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getFloors = (state) => state.floors;
export default floorSlice.reducer;
