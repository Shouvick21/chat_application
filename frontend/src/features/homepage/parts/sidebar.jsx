import { IoMdSearch } from "react-icons/io";
import "../style.css";
import { Otherusers } from "./otherusers";
import { OtherUser } from "./otheruser";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOtherUser,
  fetchSerchedUser,
  logoutUser,
  setActiveUser,
  setFlag,
} from "../../user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setSocketdata } from "../../socket/socketSlice";
import { deletemessage, setcomponentRender } from "../homepageSlice";

export const Sideber = () => {
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, flag } = useSelector((state) => state.usersdata);

  const logoutHandler = () => {
    const data = dispatch(logoutUser());
    navigate("/login");
    dispatch(setSocketdata(null));
    dispatch(setcomponentRender(""));
    dispatch(deletemessage());
  };

  // console.log(authUser)
  const serchUser = (e) => {
    const username = e.target.value;
    setsearch(username);
    console.log(username);
    if (username === "") {
      dispatch(fetchOtherUser());
    } else {
      dispatch(fetchSerchedUser(username));
    }
  };

  return (
    <div
      className={`${
        flag ? "min-w-[100%]" : null
      } border-r flex flex-col h-full`}
    >
      <div className="flex items-center p-2 gap-1">
        <input
          type="text"
          value={search}
          onChange={serchUser}
          className={`input ${flag ? "w-[100%]" : null} input-bordered`}
          placeholder="Search Name"
        />
        {/* <button className="btn bg-zinc-500 p-2 text-white">
                    <IoMdSearch size={"30px"} />
                </button> */}
      </div>
      <div className="divider px-3"></div>
      <div
        className=" h-[75%] w-full  overflow-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <Otherusers />
      </div>
      <button className="btn m-2" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};
