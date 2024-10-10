import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services";

const factoryUserSlice = createSlice({
  name: "factoryUser",
  initialState: {
    data: [],
  },
  reducers: {
    btnClickGetFactoryId: (state, action) => {
      state.factoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiAllFactoryUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// fetch api all factory
const fetchApiAllFactoryUser = createAsyncThunk(
  "factory/fetchApiAllFactory",
  async () => {
    try {
      const res = await getRequest(`nha-may/get-all`);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export { fetchApiAllFactoryUser };

export default factoryUserSlice;
