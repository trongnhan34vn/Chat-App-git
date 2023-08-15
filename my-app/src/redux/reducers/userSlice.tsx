import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/User.type';

interface IRegistryResponse {
  data: IUser;
  message: string;
  status: string;
}

interface ILoginResponse {
  data: IUser;
  message: string;
  status: string;
}

export interface UserProps {
  registryResult: IRegistryResponse | null;
  loginResult: ILoginResponse | null;
  users: IUser[];
  selectUser: IUser | null;
}

const initialState: UserProps = {
  registryResult: null,
  loginResult: null,
  users: [],
  selectUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getResponseRegistry: (state, action: PayloadAction<IRegistryResponse>) => {
      state.registryResult = action.payload;
    },
    getResponseLogin: (state, action: PayloadAction<ILoginResponse>) => {
      state.loginResult = action.payload;
    },
    resetRegistry: (state) => {
      state.registryResult = null;
    },
    resetLogin: (state) => {
      state.loginResult = null;
    },
    getAll: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    getUserById: (state, action: PayloadAction<IUser>) => {
      state.selectUser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  getResponseRegistry,
  getResponseLogin,
  resetLogin,
  resetRegistry,
  getAll,
  getUserById
} = userSlice.actions;
