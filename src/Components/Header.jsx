import React, { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Stores/UserProfile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ApiUrl = import.meta.env.ApiUrl;
const Header = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    navigate(`/FrotendMern/${search}`);
  };
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const Logout = () => {
    axios
      .post(`https://backendmern-5yke.onrender.com/user/logout`,{},{ withCredentials: true })
      .then((response) => {
        const message = response.data.message;
        console.log(response.data);
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
        });
        setIsAuthenticated(false);
        setUserData({
          _id: "",
          name: "",
          email: "",
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/FrotendMern"} className="navbar-brand">
            Raus Privated Limited
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link to="/FrotendMern" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"FrotendMern/user"} className="nav-link">
                {userData.name ? userData.name : "Profile"}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Link
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"FrotendMern/album"} className="dropdown-item">Album</Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item">Another action</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item">Something else here</Link>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                aT8v*YkLp2mZ6@qT
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                ref={searchRef}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              &nbsp;
            </form>
            {!isAuthenticated ? (
              <>
                <Link to="/FrotendMern/register">
                  <button className="btn btn-warning">SignUp</button>
                </Link>
                &nbsp;
                <Link to="/FrotendMern/login">
                  <button className="btn btn-primary">LogIn</button>
                </Link>
              </>
            ) : (
              <button className="btn btn-success" onClick={Logout}>
                LogOut
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
