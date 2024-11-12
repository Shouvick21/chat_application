import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const openAiUrl=import.meta.env.VITE_BACKEND
export const GenerateContent = ({ message, setmessage }) => {
  const [flag, setflag] = useState(false);

  const generateContentHandler = async () => {
    setflag(true);
    axios.defaults.withCredentials = true;
    const { data } = await axios.get(
      `${openAiUrl}/api/v1/ai/content?prompt=${message}`
    );
    setflag(false);
    toast.success("Content sucessfully generated");
    setmessage(data.content);
  };
  return (
    <li>
      <a onClick={generateContentHandler}>
        Generate Content
        {flag && <span className="loading loading-spinner loading-xs"></span>}
      </a>
    </li>
  );
};
