import axios from "axios";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./modal";
const openAiUrl=import.meta.env.VITE_BACKEND
export const GenerateImage = ({ message, setmessage,imagePreview,setImagePreview }) => {
  const [flag, setflag] = useState(false);
  
  // const {dropdownActive}=useSelector(state=>state.messagedata)
  // const dispatch=useDispatch()

  const generateImageHandler = async () => {
    setflag(true);
    axios.defaults.withCredentials = true;
    const { data } = await axios.get(
      `${openAiUrl}/api/v1/ai/image?prompt=${message}`
    );

    setflag(false);
    setImagePreview(true)
    toast.success("Image sucessfully generated plase preview");
    setmessage(data);
  };
  console.log("imagePreview",imagePreview)
  return (
    <>
      <li className="flex-row items-center">
        <a onClick={generateImageHandler} className="">
          Generate Image
          {flag && <span className="loading loading-spinner loading-xs"></span>}
          
        </a>
        
        {imagePreview ?  <div>
            <FaExternalLinkAlt  className="cursor-pointer z-10 " onClick={()=>document.getElementById('Custom_modla').showModal()} />
            <Modal imgurl={message}/>
          </div>
        : null  
        
        }
      </li>
    </>
  );
};
