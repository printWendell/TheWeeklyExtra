import React from 'react';
import Cookie from 'js-cookie';

function Profile() {
  const cookie = Cookie.get('user');
  console.log(cookie);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
