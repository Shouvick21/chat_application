import toast from "react-hot-toast";
// import { setSelectedFriend } from "../src/features/user/userSlice";
// import { setcomponentRender } from "../src/features/homepage/homepageSlice";
// import { useDispatch } from "react-redux";

export const customToast = (username, profilepic, message) => {
  // const dispatch=useDispatch()
  // const selectFriend=()=>{
  //     dispatch(setSelectedFriend(user))
  //     dispatch(setcomponentRender("messageContainer"))
  //     // console.log(user)
  //   }
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-auto bg-white shadow-lg rounded-lg pointer-events-auto flex  ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4 items-center ">
        <div className="flex items-start ">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full m-2"
              src={profilepic}
              alt={username}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-lg font-semibold text-gray-900">{username}</p>
            <p className="mt-1 text-sm text-gray-500">send a message</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ));
};
