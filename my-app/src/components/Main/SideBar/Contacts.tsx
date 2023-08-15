import React, { useEffect, useState } from 'react';
import Contact from './Contact';
import { IUser } from '../../../types/User.type';
import { getCurrentUser } from '../../../utils/user/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { findCurrentUserRooms } from '../../../thunk/roomThunk';
import { roomSelector, userSelector } from '../../../redux/selectors';
import { findRoomByUserReceiver } from '../../../utils/room/findRoomByReceiver';
import { useParams } from 'react-router-dom';
import { findUserById } from '../../../thunk/userThunk';

interface ContactsProps {
  users: IUser[];
}

const Contacts = ({ users }: ContactsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectUser, setSelectUser] = useState<IUser | null>(null);

  const { receiverId } = useParams();

  const currentUser = getCurrentUser();
  useEffect(() => {
    if (!currentUser) return;
    dispatch(findCurrentUserRooms(currentUser.id));
  }, []);

  const rooms = useSelector(roomSelector).userRooms;

  useEffect(() => {
    if (!receiverId) return;
    dispatch(findUserById(+receiverId));
  }, []);

  const receiver = useSelector(userSelector).selectUser;

  useEffect(() => {
    if (!receiver) return;
    setSelectUser(receiver);
  }, [receiver]);

  return (
    <div className="bg-grey-lighter flex-1 overflow-auto">
      {users.map((user) => {
        let room = findRoomByUserReceiver(user, rooms);
        return (
          <Contact
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            key={user.id}
            user={user}
            room={room}
          />
        );
      })}
    </div>
  );
};

export default Contacts;
