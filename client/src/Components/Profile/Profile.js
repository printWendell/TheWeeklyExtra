import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import { cookieStrToObj } from '../../Helpers/functions';

function Profile() {
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);
  // console.log(user.email);

  if (!user.email) return <Redirect to="/login" />;
  return (
    <div>
      <h1>Profile: {user.name}</h1>
    </div>
  );
}

export default Profile;
