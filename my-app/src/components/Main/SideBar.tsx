import React from 'react';
import Header from './SideBar/Header';
import Search from './SideBar/Search';
import Contacts from './SideBar/Contacts';
import { IUser } from '../../types/User.type';

interface SideBarProps {
  currentUser: IUser;
  users: IUser[];
}

const SideBar = ({ currentUser, users }: SideBarProps) => {
  return (
    <div className="w-1/3 border bg-[#F4F7F9] flex flex-col">
      {/* Header */}
      <Header currentUser={currentUser} />
      {/* Search */}
      <Search />
      {/* Contacts */}
      <Contacts users={users} />
    </div>
  );
};

export default SideBar;
