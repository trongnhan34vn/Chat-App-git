import React, { SetStateAction, useEffect, useState } from 'react';
import { IRegisForm } from '../../types/User.type';
import { useDispatch, useSelector } from 'react-redux';
import * as userThunk from '../../thunk/userThunk';
import { AppDispatch } from '../../redux/store';
import LoadingBtn from '../LoadingComp/LoadingBtn';
import { validateEmail, validatePassword } from '../../utils/validate/validate';
import { useForm } from 'react-hook-form';
import { registrationToast, reset } from '../../redux/reducers/toastSlice';
import { userSelector } from '../../redux/selectors';
import { resetRegistry } from '../../redux/reducers/userSlice';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../utils/constant/Regex';
import { useLoading } from '../../hooks/useLoading';

const initialState: IRegisForm = {
  name: '',
  email: '',
  password: '',
};

interface RegisterProps {
  setSignUp: React.Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean;
}

const Register = ({ isSignUp, setSignUp }: RegisterProps) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IRegisForm>({
    defaultValues: initialState,
  });

  const loading = useLoading();

  const submit = (data: IRegisForm) => {
    loading.setLoading(true);
    setTimeout(() => {
      dispatch(userThunk.register(data));
      loading.setLoading(false);
    }, 3000);
  };

  const registryResponse = useSelector(userSelector).registryResult;

  useEffect(() => {
    if (!registryResponse) return;
    if (registryResponse.status === 'success') {
      dispatch(
        registrationToast({
          type: 'success',
          message: registryResponse.message,
        })
      );
      setSignUp(!isSignUp);
      setValue("name", '');
      setValue("email", '');
      setValue("password", '');
    } else {
      dispatch(
        registrationToast({
          type: 'error',
          message: registryResponse.message,
        })
      );
    }
    setTimeout(() => {
      dispatch(resetRegistry());
      dispatch(reset());
    }, 2000);
  }, [registryResponse]);

  return (
    <div className="form-container sign-up-container">
      <form action="#" onSubmit={handleSubmit(submit)}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          {...register('name', { required: 'Name is required' })}
          name="name"
          type="text"
          placeholder="Name"
        />
        <span className="text-left text-red-500 text-[12px]">
          {errors.name?.message}
        </span>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: REGEX_EMAIL,
          })}
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.type && validateEmail(errors.email.type)}
        <input
          {...register('password', {
            required: 'Password is required',
            pattern: REGEX_PASSWORD,
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
        {errors.password?.type && validatePassword(errors.password.type)}

        <button className="relative flex cursor-pointer">
          <span>Sign Up</span>
          <div
            className={`${
              loading.isLoading ? 'ml-2 -mt-[2px]' : 'w-0 h-0 overflow-hidden'
            } transition-all ease-in duration-200`}
          >
            <LoadingBtn />
          </div>
        </button>
      </form>
    </div>
  );
};

export default Register;
