import React from 'react';
import { IUser } from '../../../types/User.type';
import { Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { resetRoomResult } from '../../../redux/reducers/roomSlice';
import { resetSelectUser } from '../../../redux/reducers/userSlice';

interface HeaderProps {
  currentUser: IUser;
}

const Header = ({ currentUser }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/auth');
    dispatch(resetRoomResult());
    dispatch(resetSelectUser());
  };

  return (
    <div className="py-2 px-3 flex flex-row justify-between items-center">
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-2" src={currentUser?.image} />
        <div className="">
          <p>{currentUser?.name}</p>
          <p className="text-[12px]">{currentUser?.email}</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              fill="#727A7E"
              d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              opacity=".55"
              fill="#263238"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            />
          </svg>
        </div>
        <Popover className="relative">
          <Popover.Button className="ml-4 outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                fill="#263238"
                fillOpacity=".6"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              />
            </svg>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute top-full right-0">
              <div className="bg-[#F2F2F2] hover:bg-[#fff] w-[100px] transition-all ease-in duration-100 shadow-xl rounded-[3px]">
                <div
                  onClick={handleSignOut}
                  className="py-2 px-3 cursor-pointer"
                >
                  <span className="text-[14px] text-red-500">Sign out</span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
