import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

function Sidebar() {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        action=""
        onSubmit={searchSubmitHandler}
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button className="btn bg-slate-500" type="submit">
          <BiSearchAlt2 size="24px" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
