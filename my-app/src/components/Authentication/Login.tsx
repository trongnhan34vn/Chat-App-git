import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../types/User.type';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../utils/constant/Regex';
import { validateEmail, validatePassword } from '../../utils/validate/validate';
import LoadingBtn from '../LoadingComp/LoadingBtn';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import * as userThunk from '../../thunk/userThunk';
import { userSelector } from '../../redux/selectors';
import { loginToast, reset } from '../../redux/reducers/toastSlice';
import { resetLogin } from '../../redux/reducers/userSlice';
import { useLoading } from '../../hooks/useLoading';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const loading = useLoading();

  const submit = (data: ILoginForm) => {
    loading.setLoading(true);
    setTimeout(() => {
      dispatch(userThunk.login(data));
      loading.setLoading(false);
    }, 3000);
  };

  const loginResult = useSelector(userSelector).loginResult;

  useEffect(() => {
    if (!loginResult) return;
    if (loginResult.status === 'success') {
      dispatch(
        loginToast({
          type: 'success',
          message: loginResult.message,
        })
      );
      localStorage.setItem('user', JSON.stringify(loginResult.data))
      navigate('/main');
    } else {
      dispatch(
        loginToast({
          type: 'error',
          message: loginResult.message,
        })
      );
    }
    setTimeout(() => {
      dispatch(resetLogin());
      dispatch(reset());
    }, 2000);
  }, [loginResult]);

  return (
    <div className="form-container sign-in-container">
      <form action="#" onSubmit={handleSubmit(submit)}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          {...register('email', {
            required: 'Email is required!',
            pattern: REGEX_EMAIL,
          })}
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.type && validateEmail(errors.email.type)}

        <input
          {...register('password', {
            required: 'Password is required!',
            pattern: REGEX_PASSWORD,
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
        {errors.password?.type && validatePassword(errors.password.type)}

        <a href="#">Forgot your password?</a>
        <button className="relative flex cursor-pointer">
          <span> Sign In</span>
          <div
            className={`${
              loading.isLoading
                ? 'ml-2 -mt-[2px]'
                : 'w-0 h-0 overflow-hidden'
            } transition-all ease-in duration-200`}
          >
            <LoadingBtn />
          </div>
        </button>
      </form>
    </div>
  );
};

export default Login;
