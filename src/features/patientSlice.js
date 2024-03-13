import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const fetchPatient = createAsyncThunk(
  "patientSlice/fetchPatient",
  async (token) => {
    try {
      const response = await api(token).get("v1/margaret/patient/all");
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch patient");
      }
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const createPatient = createAsyncThunk(
  "patientSlice/createPatient",
  async ({ token, name, age, gender, active, datetime }) => {
    const obj = {
      name,
      age,
      gender,
      active,
      admission_date: datetime,
    };
    try {
      const response = await api(token).post("v1/margaret/patient/create", obj);
      if (response.status === 201) {
        // console.log(response);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create patient");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const updatePatient = createAsyncThunk(
  "patientSlice/updatePatient",
  async ({ token, name, age, uid, toggleEditModal }) => {
    const obj = {
      name,
      age,
      uid,
    };
    let response;
    try {
      response = await api(token).put("v1/margaret/patient/update", obj);

      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update patient");
      }
    } catch (error) {
      // console.log(error.response);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const deletePatient = createAsyncThunk(
  "patientSlice/deletePatient",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(
        `v1/margaret/patient/delete/${uid}`
      );
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete patient");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const patientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.status = "idle";
        state.patients = action.payload.data;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.status = "idle";
        state.patients.push(action.payload.data);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updatePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.status = "idle";
        const updatePatientIndex = state.patients.findIndex(
          (patient) => patient.uid === action.payload.uid
        );
        if (updatePatientIndex !== -1) {
          state.patients[updatePatientIndex] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deletePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.status = "idle";
        state.patients = state.patients.filter(
          (patient) => patient.uid !== action.payload.uid
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getPatients = (state) => state.patients;
export default patientSlice.reducer;
