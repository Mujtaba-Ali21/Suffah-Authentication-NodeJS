import axios from "axios";
import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { bake_cookie } from "sfcookies";

// CSS
import "./main.css";

function Login() {
  const { API_URL, isLoggedIn, setisLoggedIn } = useAuth();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // useRef
  const inputEmail = useRef();
  const inputPassword = useRef();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const url = `${API_URL}/`;
    const json = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    axios
      .post(url, json)
      .then((res) => {
        console.log(res);
        setLoading(false);

        if (res.status === 200) {
          setMsg(res.data);
          navigate("/dashboard");
          console.log();
        } else {
          setMsg("Error creating account");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
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
            "Login"
          )}
        </h5>

        <div className="fadeIn first bg-white border-0">
          <form onSubmit={handleSubmit}>
            
            {msg && <div className="text-danger mb-2">{msg}</div>}

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
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          <div className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
