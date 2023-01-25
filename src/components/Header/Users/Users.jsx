import React, { useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://to-do-app-api-fawn.vercel.app'
    : 'http://localhost:5000'

const Users = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user)

  useEffect(() => {

    const getActiveUser = async () => {
      const response = await axios({
        method: 'get',
        url: `${baseUrl}/active-user`,
        withCredentials: true
      });
      dispatch(setUser(response.data));
    };
    getActiveUser();
    // eslint-disable-next-line
  }, []);

  return <div>
    {user
      ? <a href={`${baseUrl}/google/logout`}>
        <button type="button" className="button_google_login">Logout</button>
      </a>

      : <a href={`${baseUrl}/google/auth/google`}>
        <button type="button" className="button_google_login">Sign up</button>
      </a>}



  </div>;
};

export default Users;
