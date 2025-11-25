import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function useGetMessages() {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser?._id}`);
        dispatch(setMessages(res.data));
        console.log(res);

      } catch (error) {
        console.log(error);
        console.log("hello");
        
      }
    };
    fetchMessages();
  }, [selectedUser]);
}

export default useGetMessages;
