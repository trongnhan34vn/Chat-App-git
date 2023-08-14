import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Toast } from '../../types/Toast.type';

interface ToastProps {
  toast: Toast | null;
}

const initialState: ToastProps = {
  toast: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,
  reducers: {
    registrationToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    loginToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    reset: (state) => {
      state.toast = null;
    },
  },
});

export default toastSlice.reducer;
export const { registrationToast, reset, loginToast } = toastSlice.actions;
