import { ILoginForm, IRegisForm } from '../../types/User.type';
import instance from '../axios';

export const REGISTER = async (data: IRegisForm) => {
  let response = await instance.post('/register', data);
  return response;
};

export const LOGIN = async (data: ILoginForm) => {
  let response = await instance.post('/login', data);
  return response;
};

export const FIND_ALL = async () => {
  let response = await instance.get('/users');
  return response;
};

export const FIND_BY_ID = async (id: number) => {
  let response = await instance.get('/users/' + id);
  return response;
}
