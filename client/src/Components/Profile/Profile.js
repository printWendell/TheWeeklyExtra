import React from 'react';
import Cookie from 'js-cookie';
import { cookieStrToObj } from '../../Helpers/functions';

function Profile() {
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);
  // console.log(user.email);
  return (
    <div>
      <h1>Profile: {user.name}</h1>
    </div>
  );
}

export default Profile;
