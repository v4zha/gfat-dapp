import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState, gfatState } from "../Types/types";
import { observer } from "../services/login";

export const gfatSlice = createSlice({
  name: "gfat",
  initialState: {
    value: await observer(),
    login: LoginState.Observer,
  },
  reducers: {
    login: (state: gfatState, action: PayloadAction<gfatState>) => {
      state.value = action.payload.value;
      state.login = action.payload.login;
    },
    obs: (state: gfatState, action: PayloadAction<gfatState>) => {
      state.value = action.payload.value;
      state.login = action.payload.login;
    },
  },
});

export const { login, obs } = gfatSlice.actions;
export default gfatSlice.reducer;
