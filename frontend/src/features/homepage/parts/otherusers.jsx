import { useDispatch, useSelector } from "react-redux";
import { OtherUser } from "./otheruser";
import { useEffect } from "react";
import { fetchOtherUser } from "../../user/userSlice";

export const Otherusers = () => {
  const dispatch = useDispatch();
  let { otherusers } = useSelector((state) => state.usersdata);
  useEffect(() => {
    dispatch(fetchOtherUser());
  }, []);
  // console.log(otherusers)
  return (
    <div>
      {otherusers.map((ele) => (
        <OtherUser key={ele._id} user={ele} />
      ))}
    </div>
  );
};
