import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function useGetRealTimeMessage() {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (newMessage) => {
      // ensure messages is an array
      const merged = [...(messages || []), newMessage];
      dispatch(setMessages(merged));
    };

    socket?.on("newMessage", handler);
    return () => socket?.off("newMessage", handler);
  }, [socket, messages, dispatch]);
}

export default useGetRealTimeMessage;
