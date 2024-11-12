import { useEffect, useRef } from "react";
import { SingleMessages } from "./singlemessage";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlecteduserMessages, getUniquedate } from "../homepageSlice";

export const Messages = () => {
  const { selectedFriend } = useSelector((state) => state.usersdata);
  const { messages } = useSelector((state) => state.messagedata);

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSlecteduserMessages(selectedFriend));
  }, [selectedFriend]);

  const diiferntiateDateWise = () => {
    let previousdate;
    const datearr = [];
    for (let i = 0; i < messages.length; i++) {
      if (previousdate != messages[i].createdAt.split("T")[0]) {
        datearr.push(messages[i]._id);

        previousdate = messages[i].createdAt.split("T")[0];
      } else {
        previousdate = messages[i].createdAt.split("T")[0];
      }
    }
    dispatch(getUniquedate(datearr));
  };

  useEffect(() => {
    diiferntiateDateWise();

    /// get a bug that after select a user scrool: smooth not go till last but using settimeout i execute this funtion little bit delay becasue => ater all message and date rendered js understood that how much he need to scroll
    setTimeout(() => {
      // Scroll to the bottom of the messages container when messages change
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div
      className="px-4 overflow-auto h-[75%] relative"
      style={{ scrollbarWidth: "none" }}
    >
      {messages?.map((ele) => (
        <div key={ele._id}>
          <SingleMessages message={ele} />
        </div>
      ))}

      <div ref={messagesEndRef} />
      {/* this div only for auto scrooling */}
    </div>
  );
};
