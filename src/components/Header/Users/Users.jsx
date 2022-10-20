import React from "react";

const Users = () => {



  //save username to display from cookie
  //load users tasklist, create users Slice in redux


  //handle login with axios

  return <div>

    <a href="http://localhost:5000/google/logout">
      <button type="button" className="button_google_login" >Logout</button>
    </a>

    <a href="http://localhost:5000/google/auth/google">
      <button type="button" className="button_google_login">Sign up</button>
    </a>

  </div>;
};

export default Users;
