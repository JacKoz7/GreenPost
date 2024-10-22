import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function LogoutButton() {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      setAuthState({ Username: "", id: 0, status: false });
      navigate("/login"); // navigate to login page after logout
    }
  };

  return (
    <button onClick={logout} className="navButton">
      Logout
    </button>
  );
}

export default LogoutButton;