import { IRoom } from '../../types/Room.type';
import { IUser } from '../../types/User.type';

export const findRoomByUserReceiver = (
  receiver: IUser,
  rooms: IRoom[]
): IRoom | null => {
  for (let i = 0; i < rooms.length; i++) {
    let members = rooms[i].users;

    if (members.find(member => member.id === receiver.id)) {
      return rooms[i];
    }
  }
  return null;
};
