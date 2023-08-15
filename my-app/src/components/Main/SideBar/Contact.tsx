import React, { SetStateAction, useEffect } from 'react';
import { IUser } from '../../../types/User.type';
import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, findCurrentUserRooms } from '../../../thunk/roomThunk';
import { getCurrentUser } from '../../../utils/user/getCurrentUser';
import { IChat } from '../../../types/Chat.type';
import { formatDateTime } from '../../../utils/time-convert/formatDateTime';
import { convertTimeStampToDate } from '../../../utils/time-convert/convertTimeStampToDate';
import { IRoom } from '../../../types/Room.type';
import { useNavigate, useParams } from 'react-router-dom';

interface ContactProps {
  user: IUser;
  selectUser: IUser | null;
  setSelectUser: React.Dispatch<SetStateAction<IUser | null>>;
  room: IRoom | null;
}

const Contact = ({ room, user, setSelectUser, selectUser }: ContactProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const handleClick = () => {
    dispatch(
      createRoom({
        receiverId: user.id,
        userId: currentUser.id,
      })
    );
    navigate('/main/messages/' + user.id);
    setSelectUser(user);
  };


  const getLatestChat = (chats: IChat[]) => {
    let latestChat = chats[chats.length - 1];
    return {
      content: latestChat?.content,
      createdTime: formatDateTime(
        convertTimeStampToDate(latestChat?.createdTime)
      ),
    };
  };

  const isActive = user.id === selectUser?.id ? true : false;
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? 'bg-[#fff]' : ''
      } px-3 flex hover:bg-[#fff] transition-all ease-in duration-100 items-center bg-grey-light cursor-pointer`}
    >
      <div>
        <img className="h-12 w-12 rounded-full" src={user.image} />
      </div>
      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
        <div className="flex items-bottom justify-between">
          <p className="text-grey-darkest">{user.name}</p>
          <p className="text-xs text-grey-darkest">
            {room && getLatestChat(room.chats).createdTime}
          </p>
        </div>
        <p className="text-grey-dark mt-1 text-sm">
          {room && getLatestChat(room.chats).content}
        </p>
      </div>
    </div>
  );
};

export default Contact;
