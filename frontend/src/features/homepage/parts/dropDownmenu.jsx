import { useState } from "react";
import { GenerateContent } from "./GenerateContent";
import { GenerateImage } from "./GenerateImage";
import { useDispatch, useSelector } from "react-redux";
import { setdropdownActive } from "../homepageSlice";

export const DropDownMenu = ({ message, setmessage }) => {
  const [imagePreview,setImagePreview]=useState(false)
  const {dropdownActive}=useSelector(state=>state.messagedata)
  const dispatch=useDispatch()

  const changeIsmenuStatus = () => {
    dispatch(setdropdownActive(!dropdownActive))
    if(imagePreview) setImagePreview(false)
  };
  return (
    <details className="dropdown dropdown-top absolute top-1 left-1 ">
      <summary
        className="btn btn-square m-1 swap swap-rotate bg-transparent border-none "
        onClick={changeIsmenuStatus}
      >
        {!dropdownActive ? (
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        ) : (
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        )}
      </summary>
      <ul className="menu dropdown-content  bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <GenerateImage message={message} setmessage={setmessage} setImagePreview={setImagePreview} imagePreview={imagePreview}  />
        <GenerateContent message={message} setmessage={setmessage} />
      </ul>
    </details>
  );
};
