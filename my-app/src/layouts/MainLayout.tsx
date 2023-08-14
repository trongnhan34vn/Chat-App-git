import React, { useEffect } from 'react';
import SideBar from '../components/Main/SideBar';
import Conversation from '../components/Main/Conversation';
import { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { findAll } from '../thunk/userThunk';
import { roomSelector, userSelector } from '../redux/selectors';

const MainLayout = () => {
  const dispatch: AppDispatch = useDispatch();
  const userLocal = localStorage.getItem('user');
  const currentUser = userLocal ? JSON.parse(userLocal) : null;

  useEffect(() => {
    dispatch(findAll())
  },[])

  const users = useSelector(userSelector).users;

  const usersFilterCurrentUser = users.filter(user => user.id !== currentUser.id);

  return (
    <div>
      <div className="w-full h-32" style={{ backgroundColor: '#449388' }} />
      <div className="container mx-auto" style={{ marginTop: '-128px' }}>
        <div className="py-6 h-screen">
          <div className="flex border border-grey rounded shadow-lg h-full">
            {/* Left SideBar */}
            <SideBar currentUser={currentUser} users={usersFilterCurrentUser} />
            {/* Left SideBar */}
            {/* Right Conversation */}
            <Conversation />
            {/* Right Conversation */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
