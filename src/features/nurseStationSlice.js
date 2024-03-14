import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nurseStations: [],
  occupiedNSWards: [],
  status: "idle",
  error: null,
};

export const nurseStationSlice = createSlice({
  name: "nurseStationSlice",
  initialState,
  reducers: {
    addNurseStation: (state, action) => {
      state.nurseStations.push(action.payload);
      const occupiedWards = action.payload.ward_cabin.map((item) => item.value);
      state.occupiedNSWards.push(occupiedWards);
    },
    updateNurseStation: (state, action) => {
      const NSIndex = state.nurseStations.findIndex(
        (ns) => ns.id === action.payload.id
      );
      if (NSIndex !== -1) {
        state.nurseStations[NSIndex] = action.payload;
      }
    },
    removeNurseStation: (state, action) => {
      state.nurseStations = state.nurseStations.filter(
        (ns) => ns.id !== action.payload.id
      );
    },
  },
});

export const getNurseStation = (state) => state.nurseStation.nurseStations;
export const { addNurseStation, updateNurseStation, removeNurseStation } =
  nurseStationSlice.actions;
export default nurseStationSlice.reducer;
