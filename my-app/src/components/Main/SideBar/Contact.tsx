import React, { SetStateAction } from 'react';
import { IUser } from '../../../types/User.type';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../../thunk/roomThunk';
import { getCurrentUser } from '../../../utils/user/getCurrentUser';

interface ContactProps {
  user: IUser;
  selectUser: IUser | null;
  setSelectUser: React.Dispatch<SetStateAction<IUser | null>>;
}

const Contact = ({ user, setSelectUser, selectUser }: ContactProps) => {
  const dispatch: AppDispatch = useDispatch();

  const currentUser = getCurrentUser();

  const handleClick = () => {
    dispatch(
      createRoom({
        receiverId: user.id,
        userId: currentUser.id,
      })
    );
    setSelectUser(user);
  };

  const isActive = user.id === selectUser?.id ? true : false;
  return (
    <div
      onClick={handleClick}
      className={`${isActive ? 'bg-[#fff]': ''} px-3 flex hover:bg-[#fff] transition-all ease-in duration-100 items-center bg-grey-light cursor-pointer`}
    >
      <div>
        <img className="h-12 w-12 rounded-full" src={user.image} />
      </div>
      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
        <div className="flex items-bottom justify-between">
          <p className="text-grey-darkest">{user.name}</p>
          <p className="text-xs text-grey-darkest">12:45 pm</p>
        </div>
        <p className="text-grey-dark mt-1 text-sm">
          Get Andrés on this movie ASAP!
        </p>
      </div>
    </div>
  );
};

export default Contact;
