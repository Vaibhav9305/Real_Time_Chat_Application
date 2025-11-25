import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function useGetMessages() {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log("Get messages failed:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
}

export default useGetMessages;
