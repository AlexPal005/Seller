import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    value: 0,
  },
  reducers: {
    // it is an example, need to delete
    setValue(state, action) {
      state.value = action.payload
    },
  },
})

export const { setValue } = categorySlice.actions

export default categorySlice.reducer
