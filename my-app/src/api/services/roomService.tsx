import { IFormCreateRoom } from '../../types/Room.type';
import instance from '../axios';

export const CREATE_ROOM = async (data: IFormCreateRoom) => {
  let resposne = await instance.post('/rooms', data);
  return resposne.data;
};
