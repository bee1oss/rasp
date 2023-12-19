import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRasps = createAsyncThunk("rasps/fetchRasps", async () => {
  const { data } = await axios.get("/rasps");
  return data;
});

export const fetchRemoveRasp = createAsyncThunk(
  "rasps/fetchRemoveRasp",
  async (id) => axios.delete(`/rasps/${id}`)
);

const initialState = {
  rasps: {
    items: [],
    status: "loading",
  },
};

const raspsSlice = createSlice({
  name: "rasps",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRasps.pending]: (state) => {
      state.rasps.status = "loadingfetch";
    },
    [fetchRasps.fulfilled]: (state, action) => {
      state.rasps.items = action.payload;
      state.rasps.status = "loadedfetch";
    },
    [fetchRasps.rejected]: (state) => {
      state.rasps.items = [];
      state.rasps.status = "error";
    },
    [fetchRemoveRasp.pending]: (state, action) => {
      state.rasps.items = state.rasps.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});



export const raspsReducer = raspsSlice.reducer;
