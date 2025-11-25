import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(setOtherUsers(res.data));

      } catch (error) {
        console.log("Get users error:", error);
      }
    };

    fetchOtherUsers();
  }, []);

}

export default useGetOtherUsers;
