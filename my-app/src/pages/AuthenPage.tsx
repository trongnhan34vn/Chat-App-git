import React, { useEffect } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { toastSelector } from '../redux/selectors';

const AuthenPage = () => {
  const toastNoti = useSelector(toastSelector).toast;
  useEffect(() => {
    if(!toastNoti) return;
    if(toastNoti.type === 'success') { 
      toast.success(toastNoti.message);
    } else {
      toast.error(toastNoti.message);
    }
  },[toastNoti])

  return (
    <div>
      <AuthLayout />
      <Toaster />
    </div>
  );
};

export default AuthenPage;
