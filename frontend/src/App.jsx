import { Routes, Route } from "react-router-dom";
import { Signup } from "./component/signup";
import { Login } from "./component/login";
import { PageNotfound } from "./component/pageNotFound";
import { Homepage } from "./features/homepage/homepage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocketdata } from "./features/socket/socketSlice";
import { setActiveUser } from "./features/user/userSlice";
import { PrivateRoute } from "./component/privateRote";
import { RedirectRoute } from "./component/redirectRoute";
const apiurl = import.meta.env.VITE_BACKEND;
const RouteArr = [
  {
    path: "*",
    element: <RedirectRoute path={"/"}><PageNotfound /></RedirectRoute>,
  },
  {
    path: "/signup",
    element: <RedirectRoute path={"/"}><Signup /></RedirectRoute>,
  },
  {
    path: "/login",
    element: 
    <RedirectRoute path={"/"}>
        <Login />
        </RedirectRoute>
      
    ,
  },
  {
    path: "/",
    element: (
      <PrivateRoute path={"/login"}>
        <Homepage />
      </PrivateRoute>
    ),
  },
];

export const App = () => {
  const { socketdata } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.usersdata);

  useEffect(() => {
    if (authUser) {
      const socket = io(apiurl, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocketdata(socket));
      socket.on("onlineusers", (activeUserObj) => {
        dispatch(setActiveUser(activeUserObj));
      });
      return () => {
        socket.close();
      };
    }
  }, [authUser]);
  console.log("socketdetail", socketdata);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {RouteArr.map((ele, i) => {
          return <Route path={ele.path} element={ele.element} key={i} />;
        })}
      </Routes>
    </div>
  );
};
