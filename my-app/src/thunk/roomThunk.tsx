import { ThunkAction } from 'redux-thunk';
import { IFormCreateRoom, IRoom } from '../types/Room.type';
import { AnyAction, Dispatch } from 'redux';
import { RoomState, getRoomResult } from '../redux/reducers/roomSlice';
import { CREATE_ROOM } from '../api/services/roomService';

export const createRoom = (
  roomForm: IFormCreateRoom
): ThunkAction<Promise<void>, { room: RoomState }, undefined, AnyAction> => {
  return async function getRoomThunk(dispatch: Dispatch) {
    await CREATE_ROOM(roomForm)
      .then((response) => dispatch(getRoomResult(response.data)))
      .catch((error) => console.log(error));
  };
};


