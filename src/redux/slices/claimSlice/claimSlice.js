import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../../services";


const initialState = {
    listClaims: [],
};

const claimSlice = createSlice(
    {
        name: "claimSlice",
        initialState,
        extraReducers: (builder) => {
            builder
                .addCase(getAllClaims.fulfilled,
                    (state, action) => {
                        state.listClaims = action.payload || [];
                    })
        },
    }
);

export const getAllClaims = createAsyncThunk(
    "auth/getAllClaim",
    async () => {
        try {
            const res = await getRequest(`auth/getclaims`);
            console.log("getAllClaims", res.data.data);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }
);



export default claimSlice;