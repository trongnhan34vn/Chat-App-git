import { ThunkAction } from 'redux-thunk';
import { IFormCreateRoom, IRoom } from '../types/Room.type';
import { AnyAction, Dispatch } from 'redux';
import { RoomState, getRoomByUserReceiver, getRoomResult, getRoomsByUserId } from '../redux/reducers/roomSlice';
import {
  CREATE_ROOM,
  FIND_ROOMS_BY_USER_ID,
  FIND_ROOM_BY_USER_RECEIVER,
} from '../api/services/roomService';

export const createRoom = (
  roomForm: IFormCreateRoom
): ThunkAction<Promise<void>, { room: RoomState }, undefined, AnyAction> => {
  return async function getRoomThunk(dispatch: Dispatch) {
    await CREATE_ROOM(roomForm)
      .then((response) => dispatch(getRoomResult(response.data)))
      .catch((error) => console.log(error));
  };
};

export const findCurrentUserRooms = (
  userId: number
): ThunkAction<Promise<void>, { room: RoomState }, undefined, AnyAction> => {
  return async function getRoomsThunk(dispatch: Dispatch) {
    await FIND_ROOMS_BY_USER_ID(userId)
      .then((response) => dispatch(getRoomsByUserId(response)))
      .catch((err) => console.log(err));
  };
};

export const updateRoom = (
  receiveValue: IRoom
): ThunkAction<Promise<void>, { room: RoomState }, undefined, AnyAction> => {
  return async function updateRoomThunk(
    dispatch: Dispatch,
    getState: () => { room: RoomState }
  ) {
    let currentRoom = getState().room.roomResult;

    if (!currentRoom) return;
    if (currentRoom.id === receiveValue.id) {
      dispatch(getRoomResult(receiveValue))
    }
  };
};

export const findRoomByUserReceiver = (data: IFormCreateRoom): ThunkAction<Promise<void>, { room: RoomState }, undefined, AnyAction> => {
  return async function findRoomThunk(dispatch: Dispatch) {
    await FIND_ROOM_BY_USER_RECEIVER(data)
    .then((response) => dispatch(getRoomByUserReceiver(response)))
    .catch((err) => console.log(err));
  }
}
