import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <div className="password-field">
      <label htmlFor="password" className="login-label">
        Password
      </label>
      <div className="login-input-container">
        <input
          id="password"
          placeholder={placeholder || "Enter your Password"}
          className="login-input"
          value={value}
          onChange={onChange}
          type={isShowPassword ? "text" : "password"}
        />
        <span className="password-toggle-icon" onClick={togglePassword}>
          {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      </div>
    </div>
  );
};

export default Password;
