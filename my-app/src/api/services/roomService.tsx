import { IFormCreateRoom } from '../../types/Room.type';
import instance from '../axios';

export const CREATE_ROOM = async (data: IFormCreateRoom) => {
  let resposne = await instance.post('/rooms', data);
  return resposne.data;
};

export const FIND_ROOMS_BY_USER_ID = async (userId: number) => {
  let response = await instance.get('/rooms?userId=' + userId);
  return response.data;
};

export const FIND_ROOM_BY_USER_RECEIVER = async (data: IFormCreateRoom) => {
  let response = await instance.get(
    '/rooms/user-receiver?userId=' + data.userId + '&receiverId=' + data.receiverId
  );
  return response.data;
};
