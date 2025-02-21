import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Password from "../../components/Input/Password";
import { validateEmail } from "../../utils/helper";
import axiosapp from "../../utils/axiosapp";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      toast.error("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      toast.error("Please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axiosapp.post("/signup", {
        fullName: name,
        email: email,
        password: password,
      });
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("SignUp Successful!");
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Please try again");
        toast.error("Please try again");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="form-container">
          <h2>SignUp</h2>
          <form onSubmit={handleSignUp}>
            <label htmlFor="email" className="login-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="login-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="err-msg">{error}</p>}

            <button type="submit" className="login-button">
              SignUp
            </button>

            <p className="login-para">
              Already have an account?
              <Link to="/login" className="signup-link">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
