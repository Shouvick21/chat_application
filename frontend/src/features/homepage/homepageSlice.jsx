import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getmessage, sendMessage } from "./homepage.api";
import { decryptMessage } from "../../../utils/messageENcriptionAnd Decription";

const initialState = {
  messages: [],
  componentRender: "",
  datearr: [],
  count: 0,
  dropdownActive: false
};

export const fetchSlecteduserMessages = createAsyncThunk(
  "fetch/fetchSlecteduserMessages",
  async (obj) => {
    let id = obj._id;
    return await getmessage(id);
  }
);

export const addMessage = createAsyncThunk("fetch/addMessage", async (obj) => {
  let { data } = await sendMessage(obj);
  return data;
});

const messageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addsocketnewMessage: (state, action) => {
      // console.log("print",action.payload)
      const message = {
        ...action.payload,
        message: decryptMessage(action.payload.message),
      };
      state.messages.push(message);
    },
    setcomponentRender: (state, action) => {
      state.componentRender = action.payload;
    },
    deletemessage: (state) => {
      state.messages = [];
    },
    getUniquedate: (state, action) => {
      state.datearr = action.payload;
    },
    setdropdownActive:(state,action)=>{
      state.dropdownActive=action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlecteduserMessages.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          action.payload.forEach((ele) => {
            if (ele.message) {
              ele.message = decryptMessage(ele.message);
            }
          });
          state.messages = action.payload;
        } else {
          state.messages = [];
        }
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        // console.log("homepageslicetext=>",action.payload)
        let message = decryptMessage(action.payload.message.message);
        let newmessage = { ...action.payload.message, message };
        state.messages.push(newmessage);
      });
  },
});

export const {
  addsocketnewMessage,
  setcomponentRender,
  deletemessage,
  getUniquedate,
  setdropdownActive
} = messageSlice.actions;

export default messageSlice.reducer;
