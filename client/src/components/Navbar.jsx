import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { imageLogo } from "../utils/image";
import { FaUser } from "react-icons/fa"
import decode from "jwt-decode"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
   const [user, setUser] = useState(
     JSON.parse(localStorage.getItem("profile"))
   );
  
   
  const handleLogout = () => {
    localStorage.clear();

    navigate("/")
  }

  const token = user?.results?.token;

  if (token) {
    const decodedToken = decode(token);
    const date = new Date().getTime();

    if (decodedToken.exp * 1000 < date) {
      handleLogout();
    }
  }


   useEffect(() => {
     setUser(JSON.parse(localStorage.getItem("profile")));
   }, [location]);


  return (
    <nav className="navbar bg-light p-0">
      <div className="container">
        <Link
          className="d-flex justify-content-start py-2 align-items-center text-decoration-none text-secondary"
          to="/"
          style={{ fontFamily: "Lobster Two" }}
        >
          <img
            src={imageLogo}
            alt="decentral-logo"
            width="60px"
            height="60px"
            className="rounded"
          />
          <h3 className="px-2 fs-1 font-weight-bold">Decentral</h3>
        </Link>
        {user ? (
          <div className="d-flex align-items-center">
            <div className="px-4">
              <FaUser className="fs-5"/>
              <span className="px-1 fs-4">{user?.data?.result?.username}</span>
            </div>
            <div className="">
              <button className="btn btn-secondary btn-lg fs-5" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/auth">
            <button className="btn btn-primary btn-lg fs-5">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
