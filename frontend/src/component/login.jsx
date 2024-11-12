import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthuser } from "../features/user/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const backend = import.meta.env.VITE_BACKEND;
  let navigate = useNavigate();
  let [loginForm, setloginForm] = useState({
    username: "",
    password: "",
  });

  const SubmitLoginForm = async () => {
    try {
      let { data } = await axios.post(
        `${backend}/api/v1/user/login`,
        loginForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/");
      toast.success("login sucessfull");
      // console.log(data)
      dispatch(setAuthuser(data));
    } catch (error) {
      // console.log(error)

      toast.error(error.response.data.message);
    }
    setloginForm({
      username: "",
      password: "",
    });
  };
  return (
    <div className="">
      <div
        className="w-full p-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-300">
          Login
        </h1>

        <div className="flex flex-col gap-2 pb-2 text-lg">
          <label htmlFor="username" className="pl-2">
            Username :{" "}
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={loginForm.username}
            onChange={(e) =>
              setloginForm({ ...loginForm, username: e.target.value })
            }
            className=" input"
          />
        </div>
        <div className="flex flex-col gap-2 pb-2 text-lg">
          <label htmlFor="Password" className="pl-2">
            Password :{" "}
          </label>
          <input
            type="text"
            placeholder="Password"
            id="Password"
            value={loginForm.password}
            onChange={(e) =>
              setloginForm({ ...loginForm, password: e.target.value })
            }
            className="input"
          />
        </div>

        <button
          className="btn text-lg text-white p-2 bg-slate-600 rounded-xl w-full mt-2"
          onClick={SubmitLoginForm}
        >
          Login
        </button>
        <div className="flex justify-center mt-4 text-white gap-2">
          Not registered ?
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
