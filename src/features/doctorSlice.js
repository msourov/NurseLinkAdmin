import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";

const initialState = {
  doctors: [],
  status: "idle",
  error: null,
};

export const fetchDoctor = createAsyncThunk(
  "doctorSlice/fetchDoctor",
  async (token) => {
    try {
      const response = await api(token).get("v1/margaret/doctor/all");
      if (response.status === 200) {
        // console.log("fetchDoctor", JSON.stringify(response.data, undefined, 2));
        return response.data;
      } else {
        throw new Error("Failed to fetch doctor");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const createDoctor = createAsyncThunk(
  "doctorSlice/createDoctor",
  async ({ token, name, doctor_no, active }) => {
    // console.log(name, doctor_no, active);
    try {
      const response = await api(token).post("v1/margaret/doctor/create", {
        name: name,
        doctor_no: doctor_no,
        active: active,
      });
      if (response.status === 201) {
        // console.log(response);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create doctor");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const updateDoctor = createAsyncThunk(
  "doctorSlice/updateDoctor",
  async ({ token, values, toggleEditModal }) => {
    const { name, doctor_no, active, uid } = values;
    let response;
    try {
      response = await api(token).put("v1/margaret/doctor/update", {
        name: name,
        doctor_no: doctor_no,
        active: active,
        uid: uid,
      });

      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update doctor");
      }
    } catch (error) {
      // console.log(error.response);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "doctorSlice/deleteDoctor",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(
        `v1/margaret/doctor/delete/${uid}`
      );
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete doctor");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = "idle";
        state.doctors = action.payload.data;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.status = "idle";
        state.doctors.push(action.payload.data);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.status = "idle";
        const updateDoctorIndex = state.doctors.findIndex(
          (doctor) => doctor.uid === action.payload.uid
        );
        if (updateDoctorIndex !== -1) {
          state.doctors[updateDoctorIndex] = action.payload;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.status = "idle";
        state.doctors = state.doctors.filter(
          (doctor) => doctor.uid !== action.payload.uid
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getDoctors = (state) => state.doctors;
export default doctorSlice.reducer;
