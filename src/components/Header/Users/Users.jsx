import React, { useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

const Users = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    
      const getActiveUser = async () => {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:5000/active-user',
          withCredentials: true
        });
        dispatch(setUser(response.data));
      };
      getActiveUser();
      // eslint-disable-next-line
  }, []);

  return <div>
    {user
      ? <a href="http://localhost:5000/google/logout">
        <button type="button" className="button_google_login">Logout</button>
      </a>

      : <a href="http://localhost:5000/google/auth/google">
        <button type="button" className="button_google_login">Sign up</button>
      </a>}



  </div>;
};

export default Users;
