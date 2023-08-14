import { IUser } from "../../types/User.type";

export const getCurrentUser = () => {
  const userLocal = localStorage.getItem('user');
  const currentUser: IUser = userLocal ? JSON.parse(userLocal) : null;
  return currentUser;
}