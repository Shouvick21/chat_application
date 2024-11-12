import { useDispatch, useSelector } from "react-redux";
import { Messages } from "./messages";
import { SeneMessage } from "./sendMessage";
import { GrFormPreviousLink } from "react-icons/gr";
import { setcomponentRender } from "../homepageSlice";
import { removeSelectedFriend } from "../../user/userSlice";

export const MessageContainer = () => {
  const { selectedFriend, activeUserObj, flag } = useSelector(
    (state) => state.usersdata
  );
  const { componentRender } = useSelector((state) => state.messagedata);
  const dispatch = useDispatch();
  const previousMenufun = () => {
    dispatch(setcomponentRender("sideBar"));
    dispatch(removeSelectedFriend());
  };

  return (
    <>
      <div
        className={` ${flag ? "min-w-[100%]" : "w-[550px]"} flex flex-col`}
      >
        <div className="flex gap-3 items-center p-5 bg-zinc-800 rounded text-white w-full min-h-[79px] ">
          {selectedFriend.fullname && flag && (
            <GrFormPreviousLink
              size={30}
              onClick={previousMenufun}
              className="cursor-pointer"
            />
          )}
          <div
            className={`avatar ${
              activeUserObj.includes(selectedFriend._id) ? "online" : null
            } w-12 rounded-full`}
          >
            <img src={selectedFriend.profilePhoto} alt="" />
          </div>
          <p className="font-semibold text-lg">{selectedFriend.fullname}</p>
        </div>
        <Messages />
        <SeneMessage />
      </div>
    </>
  );
};
