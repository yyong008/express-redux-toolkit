import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSliceInfo = createAsyncThunk("/thunk/tslice/info", async () => {
  const res = await fetch("http://localhost:9899/thunk/tslice/info").then(
    (res) => res.json()
  );
  return res.code === 0 ? res.data : {};
});

export const tSlice = createSlice({
  name: "tSlice",
  initialState: { name: "", isLoading: false },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSliceInfo.pending, (state) => {
      Object.assign(state, { isLoading: true });
    }),
      builder.addCase(getSliceInfo.fulfilled, (state, action) => {
        Object.assign(state, { ...action.payload, isLoading: false });
      });
    builder.addCase(getSliceInfo.rejected, (state) => {
      Object.assign(state, { isLoading: false });
    });
  },
});
