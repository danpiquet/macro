import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedId = localStorage.getItem("userId");
  const remainingTime = calculateRemainingTime(storedExp);
  const userRecipes = localStorage.getItem("userRecipes");

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedId,
    userRecipes,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;
  let initialUserRecipes;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
    initialUserRecipes = localData.userRecipes;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [userRecipes, setUserRecipes] = useState(
    initialUserRecipes === "false" ? false : true
  );
  const [search, setSearch] = useState("");

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    logoutTimer && clearTimeout(logoutTimer);
  };

  const navigate = useNavigate();
  const login = (token, exp, userId) => {
    setToken(token);
    setUserId(userId);
    setUserRecipes(false);
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRecipes", "false");
    const remainingTime = calculateRemainingTime(exp);
    logoutTimer = setTimeout(logout, remainingTime);
    navigate("/home");
  };

  const toggleUserRecipes = (checked) => {
    if (checked === true) {
      localStorage.setItem("userRecipes", "true");
      setUserRecipes(true);
    } else {
      localStorage.setItem("userRecipes", "false");
      setUserRecipes(false);
    }
  };

  const searchRecipes = (e) => {
    setSearch(e);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
    userRecipes,
    toggleUserRecipes,
    searchRecipes,
    search,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
