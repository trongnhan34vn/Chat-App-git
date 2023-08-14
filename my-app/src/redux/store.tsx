import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import toastSlice from './reducers/toastSlice';
import roomSlice from './reducers/roomSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
