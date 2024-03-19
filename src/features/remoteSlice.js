import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../actions/api";
import { message } from "antd";
import { logout } from "./authentication/loginSlice";

const initialState = {
  remotes: [],
  status: "idle",
  error: null,
};

export const fetchRemote = createAsyncThunk(
  "remoteSlice/fetchRemote",
  async (token, dispatch) => {
    try {
      const response = await api(token).get("v1/margaret/remote/all");
      if (response.status === 200) {
        // console.log("fetchRemote", JSON.stringify(response.data, undefined, 2));
        return response.data;
      } else {
        throw new Error("Failed to fetch remote");
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
export const createRemote = createAsyncThunk(
  "remoteSlice/createRemote",
  async ({ token, name, mak_id, active }) => {
    // console.log(name, remote_no, active);
    try {
      const response = await api(token).post("v1/margaret/remote/create", {
        name,
        mak_id,
        active: active,
      });
      if (response.status === 201) {
        // console.log(response);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to create remote");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);
export const updateRemote = createAsyncThunk(
  "remoteSlice/updateRemote",
  async ({ token, values, toggleEditModal }) => {
    const { name, remote_no, active, uid } = values;
    let response;
    try {
      response = await api(token).put("v1/margaret/remote/update", {
        name: name,
        remote_no: remote_no,
        active: active,
        uid: uid,
      });

      if (response.status === 201) {
        toggleEditModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update remote");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);
export const assignRemote = createAsyncThunk(
  "remoteSlice/assignRemote",
  async ({ token, bed, makId, toggleAssignModal }) => {
    console.log("inside assignRemote slice", bed, makId);
    try {
      const response = await api(token).put("v1/margaret/bed/mak/assign", {
        uid: bed,
        mak_id: makId,
      });
      if (response.status === 201) {
        toggleAssignModal(false);
        message.success(response.data.message);
        return response.data;
      } else {
        throw new Error("Failed to update remote");
      }
    } catch (error) {
      if (error?.response?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);
export const deleteRemote = createAsyncThunk(
  "remoteSlice/deleteRemote",
  async ({ token, uid }) => {
    try {
      const response = await api(token).delete(
        `v1/margaret/remote/delete/${uid}`
      );
      if (response.status === 201) {
        message.success(response.data.message);
        return uid;
      } else {
        throw new Error("Failed to delete remote");
      }
    } catch (error) {
      if (error?.res?.status === 400 || 404) {
        message.error(error?.response?.data?.message);
      }
    }
  }
);

export const remoteSlice = createSlice({
  name: "remoteSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRemote.fulfilled, (state, action) => {
        state.status = "idle";
        state.remotes = action.payload.data;
      })
      .addCase(fetchRemote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createRemote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRemote.fulfilled, (state, action) => {
        state.status = "idle";
        state.remotes.push(action.payload.data);
      })
      .addCase(createRemote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateRemote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRemote.fulfilled, (state, action) => {
        state.status = "idle";
        const updateRemoteIndex = state.remotes.findIndex(
          (remote) => remote.uid === action.payload.uid
        );
        if (updateRemoteIndex !== -1) {
          state.remotes[updateRemoteIndex] = action.payload;
        }
      })
      .addCase(updateRemote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(assignRemote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignRemote.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(assignRemote.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteRemote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRemote.fulfilled, (state, action) => {
        state.status = "idle";
        state.remotes = state.remotes.filter(
          (remote) => remote.uid !== action.payload.uid
        );
      })
      .addCase(deleteRemote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const getRemotes = (state) => state.remotes;
export default remoteSlice.reducer;
