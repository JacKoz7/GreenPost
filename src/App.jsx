import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";
import Post from "./pages/post";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/logo.png";
import Profile from "./pages/Profile";

function App() {
  const [authState, setAuthState] = useState({
    Username: "",
    id: 0,
    status: false,
  });
  const [loading, setLoading] = useState(true); // initialize loading state

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: { accessToken: token },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState((prevState) => ({ ...prevState, status: false }));
          } else {
            setAuthState({
              Username: response.data.Username,
              id: response.data.id,
              status: true,
            });
          }
          setLoading(false); // set loading to false after checking token
        })
        .catch(() => {
          setAuthState((prevState) => ({ ...prevState, status: false }));
          setLoading(false); // set loading to false if there's an error
        });
    } else {
      setLoading(false); // set loading to false if no token
    }
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      setAuthState({ Username: "", id: 0, status: false });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // show loading indicator while checking token
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            {!authState.status ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "active NavLogo" : "NavLogo"
                  }
                >
                  <img src={logo} alt="Logo" className="logoImage" />
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active NavLogo" : "NavLogo"
                  }
                >
                  <img src={logo} alt="Logo" className="logoImage" />
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home Page
                </NavLink>
                <NavLink
                  to="/createpost"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Create a Post
                </NavLink>
                <button onClick={logout} className="navButton">
                  Logout
                </button>
                <NavLink
                  to={`/profile/${authState.id}`}
                  className="navUsername"
                >
                  Logged in as {authState.Username}
                </NavLink>
              </>
            )}
          </nav>
          <Routes>
            <Route
              path="/"
              element={!authState.status ? <Navigate to="/login" /> : <Home />}
            />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <footer>
            <p>© 2024 GreenPost</p>
            <p>
              <a href="http://jigsaw.w3.org/css-validator/check/referer">
                <img
                  src="http://jigsaw.w3.org/css-validator/images/vcss"
                  alt="Poprawny CSS!"
                />
              </a>
            </p>
          </footer>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;