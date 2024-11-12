import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiurl = import.meta.env.VITE_BACKEND;
const initialState = {
  authUser: null,
  otherusers: [],
  selectedFriend: {},
  activeUserObj: [],
  // falg false means computer size screen and true means mobile size screen
  flag: false, // it deffault done
};

export const fetchOtherUser = createAsyncThunk("fetch/otheruser", async () => {
  axios.defaults.withCredentials = true;
  let { data } = await axios.get(`${apiurl}/api/v1/user`);
  // console.log("otherusers",data)
  return data;
});

export const fetchSerchedUser = createAsyncThunk(
  "fetch/fetchSerchedUser",
  async (name) => {
    axios.defaults.withCredentials = true;
    let { data } = await axios.get(`${apiurl}/api/v1/user/search?name=${name}`);
    return data;
  }
);

export const logoutUser = createAsyncThunk("fetch/logoutUser", async () => {
  let { data } = await axios.get(`${apiurl}/api/v1/user/logout`);
  toast.success(data.message);
  return data;
});

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthuser: (state, action) => {
      state.authUser = action.payload;
    },
    setSelectedFriend: (state, action) => {
      state.selectedFriend = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUserObj = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
    removeSelectedFriend: (state) => {
      state.selectedFriend = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherUser.fulfilled, (state, action) => {
        state.otherusers = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.selectedFriend = {};
        state.otherusers = [];
        state.activeUserObj = [];
        state.flag = false;
      })
      .addCase(fetchSerchedUser.fulfilled, (state, action) => {
        state.otherusers = action.payload;
      });
  },
});

export const {
  setAuthuser,
  setSelectedFriend,
  setActiveUser,
  setFlag,
  removeSelectedFriend,
} = userslice.actions;

export default userslice.reducer;
