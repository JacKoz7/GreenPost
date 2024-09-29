import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";
import Post from "./pages/post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/logo.png";

function App() {
  const [authState, setAuthState] = useState({
    Username: "",
    id: 0,
    status: false,
  }); // initialize authState based on localStorage

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: { accessToken: token },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
          } else {
            setAuthState({
              Username: response.data.Username,
              id: response.data.id,
              status: true,
            });
          }
        });
    }
  }, []); // render once when you open page

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      setAuthState({ Username: "", id: 0, status: false });
    }
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? "active NavLogo" : "NavLogo"}>
              <img src={logo} alt="Logo" className="logoImage" />
            </NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Home Page
            </NavLink>
            <NavLink to="/createpost" className={({ isActive }) => isActive ? "active" : ""}>
              Create a Post
            </NavLink>
            {!authState.status ? (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <button onClick={logout} className="navButton">
                  Logout
                </button>
                <span className="navUsername">
                  Logged in as {authState.Username}
                </span>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;