import axios from "axios";
const apiurl = import.meta.env.VITE_BACKEND;

export const getmessage = async (id) => {
  try {
    axios.defaults.withCredentials = true;
    let { data } = await axios.get(`${apiurl}/api/v1/message/getmessage/${id}`);
    //  console.log("data",data)
    return data;
  } catch (error) {
    return [];
  }
};
export const sendMessage = async ({ reciverId, message }) => {
  try {
    let data = await axios.post(
      `${apiurl}/api/v1/message/send/${reciverId}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
