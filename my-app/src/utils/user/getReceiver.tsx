import { IUser } from '../../types/User.type';

export const getReceiver = (currentUser: IUser, members: IUser[]) => {
  const receiver = members.find((user) => user.id !== currentUser.id);
  if (!receiver) return null;
  return receiver;
};
