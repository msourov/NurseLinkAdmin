import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";

const initialState = {
  beds: [],
  status: "idle",
  error: null,
};

export const fetchBed = createAsyncThunk("bedSlice/fetchBed", async (token) => {
  try {
    const response = await api(token).get("v1/margaret/bed/all");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch bed");
    }
  } catch (error) {
    console.error(error);
    message.error(error?.response?.data?.message);
    throw error;
  }
});
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
      message.error(error?.response?.data?.message);
      throw error;
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
      // console.log(error.response);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
// export const deleteFloor = createAsyncThunk(
//   "floorSlice/deleteFloor",
//   async ({ token, uid }) => {
//     try {
//       const response = await api(token).delete(
//         `v1/margaret/floor/delete/${uid}`
//       );
//       if (response.status === 201) {
//         message.success(response.data.message);
//         return uid;
//       } else {
//         throw new Error("Failed to delete floor");
//       }
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );

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
      });
    //   .addCase(updateFloor.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(updateFloor.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     const updateFloorIndex = state.floors.findIndex(
    //       (floor) => floor.uid === action.payload.uid
    //     );
    //     if (updateFloorIndex !== -1) {
    //       state.floors[updateFloorIndex] = action.payload;
    //     }
    //   })
    //   .addCase(updateFloor.rejected, (state, action) => {
    //     state.status = "error";
    //     state.error = action.error.message;
    //   })
    //   .addCase(deleteFloor.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(deleteFloor.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.floors = state.floors.filter(
    //       (floor) => floor.uid !== action.payload.uid
    //     );
    //   })
    //   .addCase(deleteFloor.rejected, (state, action) => {
    //     state.status = "error";
    //     state.error = action.error.message;
    //   });
  },
});

export const getBeds = (state) => state.beds;
export default bedSlice.reducer;
