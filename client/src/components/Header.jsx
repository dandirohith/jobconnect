import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaHome,
  FaCoins,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header flex-1 w-full">
      <div className="flex-1 flex mx-8 space-between">
        <img
          className="object-cover p-4"
          href="/"
          src="https://see.fontimg.com/api/renderfont4/mL0OG/eyJyIjoiZnMiLCJoIjo1MywidyI6MTI1MCwiZnMiOjQyLCJmZ2MiOiIjRjFGMUYxIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/Sm9iQ29ubmVjdA/bloodyroaddemo.png"
          alt="logo"
        />
        <div className="flex-1 flex w-full">
          <ul className="justify-left mr-auto">
            <li className="">
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
          </ul>
          <ul>
            {user ? (
              <>
                <div className="text-white flex flex-row justify-between">
                  <p className="text-white mr-6">Welcome, {user.name}</p>{" "}
                  <FaCoins />
                  <p>{user.rupees}</p>
                </div>
                {user.role === "Student" ? (
                  <>
                    <li>
                      <Link to="/jobs">
                        <FaClipboardList /> Jobs
                      </Link>
                    </li>
                  </>
                ) : user.role === "Company" ? (
                  <>
                    <li>
                      <Link to="/createjobs">
                        <FaClipboardList /> PostJob
                      </Link>
                    </li>
                  </>
                ) : null}
                <li>
                  <button className="btn" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
