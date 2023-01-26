import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);
  return (
    <nav>
      {authCtx.token ? (
        <div>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/addrecipe">Add Recipe</NavLink>
          <button onClick={() => authCtx.logout()}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
