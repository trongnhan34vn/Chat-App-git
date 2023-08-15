import { AnyAction, Dispatch } from 'redux';
import { ILoginForm, IRegisForm } from '../types/User.type';
import { FIND_ALL, FIND_BY_ID, LOGIN, REGISTER } from '../api/services/userService';
import {
  UserProps,
  getAll,
  getResponseLogin,
  getResponseRegistry,
  getUserById,
} from '../redux/reducers/userSlice';
import { ThunkAction } from 'redux-thunk';

export const register = (
  user: IRegisForm
): ThunkAction<Promise<void>, { user: UserProps }, undefined, AnyAction> => {
  return async function getRegistryUserThunk(dispatch: Dispatch) {
    await REGISTER(user)
      .then((response) => dispatch(getResponseRegistry(response.data)))
      .catch((error) => dispatch(getResponseRegistry(error.response.data)));
  };
};

export const login = (
  user: ILoginForm
): ThunkAction<Promise<void>, { user: UserProps }, undefined, AnyAction> => {
  return async function login(dispatch: Dispatch) {
    await LOGIN(user)
      .then((response) => dispatch(getResponseLogin(response.data)))
      .catch((error) => dispatch(getResponseLogin(error.response.data)));
  };
};

export const findAll = (): ThunkAction<
  Promise<void>,
  { user: UserProps },
  undefined,
  AnyAction
> => {
  return async function findAllThunk(dispatch: Dispatch) {
    await FIND_ALL()
      .then((response) => dispatch(getAll(response.data)))
      .catch((error) => console.log(error));
  };
};

export const findUserById = (userId: number): ThunkAction<
Promise<void>,
{ user: UserProps },
undefined,
AnyAction
> => {
  return async function findUserByIdThunk(dispatch: Dispatch) {
    await FIND_BY_ID(userId)
    .then(response => dispatch(getUserById(response.data)))
    .catch((error) => console.log(error));
  }
}
