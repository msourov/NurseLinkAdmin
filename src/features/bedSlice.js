import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";

const initialState = {
  beds: [],
  status: "idle",
  error: null,
};

export const fetchBed = createAsyncThunk(
  "bedSlice/fetchBed",
  async (token, dispatch) => {
    try {
      const response = await api(token).get("v1/margaret/bed/all");
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch bed");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data.message);
      }
      if (error?.response?.status === 401 || 403) {
        message.error(error?.response?.data.message);
        localStorage.clear();
        dispatch(logout());
      }
    }
  }
);
export const createBed = createAsyncThunk(
  "bedSlice/createBed",
  async ({ token, values }) => {
    const obj = {
      name: values.name,
      floor_uid: values.floor_uid,
      ward_uid: values.ward_uid,
      active: values.active,
    };
    try {
      const response = await api(token).post("v1/margaret/bed/create", obj);
      if (response.status === 201) {
        // console.log(response);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create bed");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);
export const updateBed = createAsyncThunk(
  "bedSlice/updateBed",
  async ({ token, values, editUid, toggleEditModal }) => {
    const { name, floor_uid, ward_uid, active } = values;
    const obj = {
      name,
      floor_uid,
      ward_uid,
      active,
      uid: editUid,
    };
    let response;
    try {
      response = await api(token).put("v1/margaret/bed/update", obj);

      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update bed");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);
export const deleteBed = createAsyncThunk(
  "bedSlice/deleteBed",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(`v1/margaret/bed/delete/${uid}`);
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete bed");
      }
    } catch (error) {
      if (error?.res?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);

export const bedSlice = createSlice({
  name: "bedSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBed.fulfilled, (state, action) => {
        state.status = "idle";
        state.beds = action.payload.data;
      })
      .addCase(fetchBed.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createBed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBed.fulfilled, (state, action) => {
        state.status = "idle";
        state.beds.push(action.payload.data);
      })
      .addCase(createBed.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateBed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBed.fulfilled, (state, action) => {
        state.status = "idle";
        const updateBedIndex = state.beds.findIndex(
          (bed) => bed.uid === action.payload.uid
        );
        if (updateBedIndex !== -1) {
          state.beds[updateBedIndex] = action.payload;
        }
      })
      .addCase(updateBed.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteBed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBed.fulfilled, (state, action) => {
        state.status = "idle";
        state.beds = state.beds.filter((bed) => bed.uid !== action.payload.uid);
      })
      .addCase(deleteBed.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getBeds = (state) => state.beds;
export default bedSlice.reducer;
