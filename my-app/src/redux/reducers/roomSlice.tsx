import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRoom } from '../../types/Room.type';

export interface RoomState {
  roomResult: IRoom | null;
}

const initialState: RoomState = {
  roomResult: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    getRoomResult: (state, action: PayloadAction<IRoom>) => {
      state.roomResult = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const { getRoomResult } = roomSlice.actions;
