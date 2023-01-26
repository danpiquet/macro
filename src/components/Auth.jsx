import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { Navigate, useNavigate } from "react-router-dom";


const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate()

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };

    axios
      .post(register ? "/api/register" : "/api/login", body)
      .then((res) => {
        console.log("POST AUTH", res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
        console.log(err)
        // alert(err);
      });
    setRegister(!register);
  };

  return (
    <div>
      {register ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Welcome to macro. Please Register</h2>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Register</button>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Welcome to macro. Please Sign In</h2>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => navigate('/home')}>Sign In</button>
        </form>
      )}
      <button onClick={() => setRegister(!register)}>
        Need to {register ? "Login?" : "Register?"}
      </button>
    </div>
  );
};

export default Auth;
