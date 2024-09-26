import "./App.css";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";
import Post from "./pages/post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/" activeClassName="active"> Home Page </NavLink>
          <NavLink to="/createpost" activeClassName="active"> Create a Post </NavLink>
          <NavLink to="/login" activeClassName="active"> Login </NavLink>
          <NavLink to="/register" activeClassName="active"> Register </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;