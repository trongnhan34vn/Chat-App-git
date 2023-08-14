import React, { useState } from 'react';
import Contact from './Contact';
import { IUser } from '../../../types/User.type';

interface ContactsProps {
  users: IUser[];
}

const Contacts = ({ users }: ContactsProps) => {
  const [selectUser, setSelectUser] = useState<IUser | null>(null);
  return (
    <div className="bg-grey-lighter flex-1 overflow-auto">
      {users.map((user) => (
        <Contact
          selectUser={selectUser}
          setSelectUser={setSelectUser}
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
};

export default Contacts;
