import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, addsocketnewMessage } from "../homepageSlice";
import {
  decryptMessage,
  encriptMessage,
} from "../../../../utils/messageENcriptionAnd Decription";

import axios from "axios";
import { customToast } from "../../../../utils/toast";

import { DropDownMenu } from "./dropDownmenu";

// import { findusername } from "../../user/userSlice";
const apiurl = import.meta.env.VITE_BACKEND;
export const SeneMessage = () => {
  const { selectedFriend, authUser } = useSelector((state) => state.usersdata);
  const { socketdata } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [message, setmessage] = useState("");
  const inputref = useRef(null);

  const sendMessageHandler = () => {
    const seningMessageText = encriptMessage(message);

    let obj = {
      reciverId: selectedFriend._id,
      message: seningMessageText,
    };
    setmessage("");
    dispatch(addMessage(obj));
  };
  useEffect(() => {
    if (socketdata) {
      socketdata.on("newmessage", (newmessage) => {
        if (newmessage.senderId == selectedFriend._id) {
          dispatch(addsocketnewMessage(newmessage));
        } else if (newmessage.reciverId == authUser._id) {
          finduserByid(newmessage.senderId, newmessage);
        } else {
          console.log("else", newmessage);
        }
      });
    }
    return () => {
      if(socketdata)socketdata.off("newmessage"); // Removes the "newmessage" listener
    };
  }, []);
  useEffect(() => {
    inputref.current.focus();
  }, [selectedFriend]);
  const finduserByid = async (id, message) => {
    let { data } = await axios.get(`${apiurl}/api/v1/user/serchByid/${id}`);
    const username = data[0].fullname;
    const profilepic = data[0].profilePhoto;
    const onlymessage = decryptMessage(message.message);
    customToast(username, profilepic, onlymessage);
  };
  return (
    <div className="w-full relative p-2">
      {/* <SendMessageManu /> */}
      <DropDownMenu message={message} setmessage={setmessage} />
      <input
        type="text"
        ref={inputref}
        value={message}
        onKeyDown={(e) => {
          e.code == "Enter" && e.target.value !== ""
            ? sendMessageHandler()
            : null;
        }}
        onChange={(e) => setmessage(e.target.value)}
        placeholder="send message .."
        className="input bg-gray-500 text-white border-none w-[100%] px-[50px] "
      />
      <button
        onClick={sendMessageHandler}
        className="absolute flex items-center end-3 inset-y-0"
      >
        <IoSend size={"30px"} />
      </button>
    </div>
  );
};
