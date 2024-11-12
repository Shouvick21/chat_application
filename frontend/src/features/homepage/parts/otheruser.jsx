import { useDispatch, useSelector } from "react-redux";
import { setSelectedFriend } from "../../user/userSlice";
import { setcomponentRender } from "../homepageSlice";

export const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedFriend, activeUserObj } = useSelector(
    (state) => state.usersdata
  );
  const { fullname, profilePhoto, _id } = user;

  const selectFriend = () => {
    dispatch(setSelectedFriend(user));
    dispatch(setcomponentRender("messageContainer"));
    // console.log(user)
  };

  return (
    <div
      onClick={selectFriend}
      className={`${
        selectedFriend._id === _id ? "bg-zinc-500" : null
      }   flex gap-3 items-center p-5 hover:bg-zinc-300 rounded cursor-pointer`}
    >
      <div
        className={`avatar ${
          activeUserObj.includes(_id) ? "online" : null
        } w-12 rounded-full`}
      >
        <img src={profilePhoto} alt="" />
      </div>
      <p className="font-semibold text-lg">{fullname}</p>
    </div>
  );
};
