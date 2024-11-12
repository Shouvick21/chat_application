import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Signup = () => {
  const backend = import.meta.env.VITE_BACKEND;
  let navigate = useNavigate();
  // let [recievedMessage,setrecievedMessage]=useState("")
  let [signupForm, setsignupForm] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const SubmitSignupForm = async () => {
    // console.log(signupForm)

    try {
      let response = await axios.post(
        `${backend}/api/v1/user/register`,
        signupForm
      );
      // console.log(response)
      // setrecievedMessage(response.data.message)
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      // console.log(error)
      // setrecievedMessage(error.response.data.message)
      toast.error(error.response.data.message);
    }

    setsignupForm({
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: "",
    });
  };

  return (
    <div className="">
      <div className="w-96 p-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">Signup</h1>

        <div className="flex flex-col gap-0 py-1 text-lg">
          <label htmlFor="Fullname" className="pl-2">
            Full Name :{" "}
          </label>
          <input
            type="text"
            placeholder="Full Name"
            id="Fullname"
            value={signupForm.fullname}
            onChange={(e) =>
              setsignupForm({ ...signupForm, fullname: e.target.value })
            }
            className="input "
          />
        </div>
        <div className="flex flex-col gap-0 pb-2 text-lg">
          <label htmlFor="username" className="pl-2">
            Username :{" "}
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={signupForm.username}
            onChange={(e) =>
              setsignupForm({ ...signupForm, username: e.target.value })
            }
            className="input"
          />
        </div>
        <div className="flex flex-col gap-0 pb-2 text-lg">
          <label htmlFor="Password" className="pl-2">
            Password :{" "}
          </label>
          <input
            type="text"
            placeholder="Password"
            id="Password"
            value={signupForm.password}
            onChange={(e) =>
              setsignupForm({ ...signupForm, password: e.target.value })
            }
            className="input"
          />
        </div>
        <div className="flex flex-col gap-0 pb-2 text-lg">
          <label htmlFor="ConfirmPassword" className="pl-2">
            Confirm Password :{" "}
          </label>
          <input
            type="text"
            placeholder="Confirm Password"
            id="ConfirmPassword"
            value={signupForm.confirmpassword}
            onChange={(e) =>
              setsignupForm({ ...signupForm, confirmpassword: e.target.value })
            }
            className="input"
          />
        </div>
        <div className="flex items-center gap-0 pt-2 ml-4 text-white">
          <form action="" className="flex items-center">
            <p className="m-1">Male </p>
            <input
              type="radio"
              name="gender"
              id="Male"
              checked={signupForm.gender === "Male"}
              onChange={() => setsignupForm({ ...signupForm, gender: "Male" })}
              className="radio bg-white"
            />

            <p className="m-1">Female </p>
            <input
              type="radio"
              name="gender"
              id="Female"
              checked={signupForm.gender === "Female"}
              onChange={() =>
                setsignupForm({ ...signupForm, gender: "Female" })
              }
              className="radio bg-white"
            />
          </form>
        </div>
        <button
          className="btn text-lg text-white p-2 bg-slate-600 rounded-xl w-full mt-2"
          onClick={SubmitSignupForm}
        >
          Signup
        </button>
        {/* <div id="BackendMessage" className="text-red-500 text-center">
            {recievedMessage}
          </div> */}
        <div className="flex justify-center mt-4 text-white gap-2">
          Already have an account ?
          <Link to="/login" className="underline">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

// ml-2 cursor-pointer
