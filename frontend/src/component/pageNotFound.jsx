import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageNotfound = () => {
  let [time, settime] = useState(5);
  let navigate = useNavigate();
  let id;
  useEffect(() => {
    if (time == 0) {
      navigate("/");
    }
    id = setInterval(() => {
      settime((time) => time - 1);
      // console.log(time)
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time]);

  return (
    <div style={{ margin: "auto", width: "30%" }}>
      <h1 className="text-white text-4xl">Page IS not Found</h1>
      <p className="text-white text-4xl">
        you will be redirect to main page in{" "}
        <span className="text-4xl" style={{ color: "blue" }}>{time}</span>{" "}
      </p>
    </div>
  );
};
