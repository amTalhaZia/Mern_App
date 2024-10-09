import React from 'react';
import { useAuth } from './context/Auth';

const House = () => {
  const { user } = useAuth();
  // console.log("user", user);
  
  // console.log("username",user.user.username);
  

  return (
    <div>
      {user ? (
        <h2>{user.user.username}</h2>
      ) : (
        <p>Please log in to see your username.</p>
      )}
    </div>
  );
};

export default House;
