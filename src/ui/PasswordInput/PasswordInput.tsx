import React, { useState } from "react";

interface PasswordInputProps {
  password?: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = (params: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={params.password}
          onChange={params.handleChange}
          style={{ width: "100%", paddingRight: "30px" }}
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </span>
      </div>
    </>
  );
};

export default PasswordInput;
