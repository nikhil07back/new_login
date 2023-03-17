import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice"

function Header() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClick = () => {
    dispatch(logout())
    navigate('/login')  
      dispatch(reset())
  }


  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handleClick} >Logout</button>
          </li>
        ) : ( 
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
       )} 
      </ul>
    </header>
  );
}

export default Header;
