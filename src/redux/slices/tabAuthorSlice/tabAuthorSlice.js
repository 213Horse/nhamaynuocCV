import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tabAuthor : null
}

const tabAuthorSlice = createSlice({
  name: 'tabAuthorSlice',
  initialState,
  reducers: {
    btnClickTabAuthor : (state, action) => {
        state.tabAuthor = action.payload
    }
  }
});


export default tabAuthorSlice