import { useDispatch, useSelector } from "react-redux";
import { MessageContainer } from "./parts/messageConatiner";
import { Sideber } from "./parts/sidebar";
import { useEffect  } from "react";
import { setFlag } from "../user/userSlice";

export const Homepage = () => {
  const {  flag } = useSelector((state) => state.usersdata);
  const dispatch = useDispatch();
  const { componentRender } = useSelector((state) => state.messagedata);
  // const [flag,setflag]=useState(false)
  // console.log(window.innerWidth)
  useEffect(() => {
    if (window.innerWidth < 840) {
      dispatch(setFlag(true));
      // setflag(true)
    }
  }, []);
  // console.log(componentRender)
  const rendercomponet = () => {
    if (flag && componentRender == "messageContainer") {
      // console.log("only message")
      return <MessageContainer />;
    }
    if (flag && componentRender == "sideBar") {
      return <Sideber />;
    }
    if (flag) {
      return <Sideber />;
    } else {
      return (
        <>
          <Sideber />
          <MessageContainer />
        </>
      );
    }
  };
  return (
    <div
      className={`flex ${
        flag ? "w-[90%]" : null
      } h-[80vh] rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border `}
    >
      {/* <Sideber/> */}
      {/* {
            Object.keys(selectedFriend).length !== 0 ? <MessageContainer/> : null
        } */}
      {rendercomponet()}
      {/* <MessageContainer/> */}
    </div>
  );
};
