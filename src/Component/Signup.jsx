import axios from "axios";
import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { bake_cookie } from "sfcookies";

// CSS
import "./main.css";

function Signup() {
  const { API_URL, isLoggedIn, setisLoggedIn } = useAuth();
  const [msg, setMsg] = useState("");
  let [loading, setLoading] = useState(false);
  
  // useRef
  
  const inputPassword = useRef();
  const inputEmail = useRef();
  const inputName = useRef();

  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    const url = `${API_URL}/signup`;
    const json = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };
    
    
    axios
  .post(url, json)
  .then((res) => {
    setLoading(false);
    console.log(res);
    setisLoggedIn(true);
    bake_cookie("isLoggedIn", true);

    if (res.status === 201) {
  setMsg("Account Created Successfully");
  navigate("/");
} else {
  setMsg("Error creating account");
}

  })
  .catch((err) => {
    setLoading(false);
    console.log(err.response.data);
    setMsg(err.response.data);
  });
  }
  


  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h5 className="text-center text-dark mt-3">
          {" "}
          {loading ? (
            <RingLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="mx-auto"
            />
          ) : (
            "Signup"
          )}
        </h5>

        <div className="fadeIn first bg-white border-0">
          <form onSubmit={handleSubmit}>
            
          {msg && <div className="text-danger mb-2">{msg}</div>}


          <input
              type="text"
              className="fadeIn second"
              name="login"
              placeholder="Username"
              required
              ref={inputName}
            />
            <input
              type="text"
              className="fadeIn second"
              name="login"
              placeholder="Email"
              required
              ref={inputEmail}
            />
            <input
              type="password"
              className="fadeIn third"
              name="login"
              placeholder="Password"
              required
              ref={inputPassword}
            />
            <input type="submit" className="fadeIn fourth mt-5" value="Sign Up" />
          </form>
          <div className="mt-2">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
