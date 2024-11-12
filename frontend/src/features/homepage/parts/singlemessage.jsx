import { useState } from "react";
import { useSelector } from "react-redux";
import { SlSizeFullscreen } from "react-icons/sl";
import { Modal } from "./modal";
export const SingleMessages = ({ message }) => {
  const { selectedFriend, authUser } = useSelector((state) => state.usersdata);
  const { datearr } = useSelector((state) => state.messagedata);
  const [imagehover,setImgaehover]=useState(false)
  const renderDate = (date) => {
    return `${date.split("T")[1].split(":")[0]}:${
      date.split("T")[1].split(":")[1]
    } `;
  };
  const convertdate = (wholedate) => {
    return `${wholedate.split("T")[0]}`;
  };
  const formatedContent = (message) => {
    const startIndex = message.indexOf("(");
    const endIndex = message.indexOf(")");
    if (startIndex == -1 || endIndex == -1) {
      return message;
    } else {
      return message.slice(startIndex + 1, endIndex);
    }
  };

  return (
    <>
      {datearr.includes(message._id) ? (
        <div>
          <div className="divider m-0"></div>
          <p className="text-center text-sm">
            {convertdate(message.createdAt)}
          </p>
        </div>
      ) : null}
      <div
        className={`chat ${
          authUser._id === message.senderId ? "chat-end" : "chat-start"
        } `}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                authUser._id === message.senderId
                  ? authUser.profilePhoto
                  : selectedFriend.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-black">
            {renderDate(message.createdAt)}
          </time>
        </div>
        <div className="chat-bubble max-w-[50%] relative">
          {message.message.includes(
            "dcrishrzl"
          ) ? (
            <>
            
            { imagehover &&  <>
              <SlSizeFullscreen size={"20px"} className="absolute top-1/2 left-1/2 cursor-pointer z-[1]"  onMouseEnter={()=>setImgaehover(true)}  onClick={()=>document.getElementById('Custom_modla').showModal()}/> <Modal imgurl={message.message} setImgaehover={setImgaehover}/>
            </>}
            <img src={message.message} onMouseEnter={()=>setImgaehover(true)} onMouseLeave={()=>setImgaehover(false)} alt="image.jpg" className={`rounded-md  ${imagehover && "opacity-15 "} `} />
            </>
          ) : (
            <div>{message.message}</div>
          )}
          
        </div>
      </div>
      
    </>
  );
};
