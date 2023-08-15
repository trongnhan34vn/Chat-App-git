import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRoom } from '../../types/Room.type';

export interface RoomState {
  roomResult: IRoom | null;
  userRooms: IRoom[];
}

const initialState: RoomState = {
  roomResult: null,
  userRooms: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    getRoomResult: (state, action: PayloadAction<IRoom>) => {
      state.roomResult = action.payload;
    },
    getRoomsByUserId: (state, action: PayloadAction<IRoom[]>) => {
      state.userRooms = action.payload;
    },
    getRoomByUserReceiver: (state, action: PayloadAction<IRoom>) => {
      state.roomResult = action.payload;
    },
    resetRoomResult: (state) => {
      state.roomResult = null;
    },
  },
});

export default roomSlice.reducer;
export const {
  getRoomResult,
  getRoomsByUserId,
  getRoomByUserReceiver,
  resetRoomResult,
} = roomSlice.actions;
