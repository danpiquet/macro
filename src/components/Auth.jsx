import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const classes = useStyles();

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
        navigate("/home");
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
        console.log(err);
        // alert(err);
      });
  };

  return (
    <div className={classes.form}>
      <Typography variant="h2" style={{ marginTop: "65px" }}>
        Macro
      </Typography>
      <TextField
        label="Username"
        className={classes.textField}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        className={classes.textField}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        onClick={(e) => handleSubmit(e)}
      >
        {register ? "Register" : "Sign In"}
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => setRegister(!register)}
      >
        Need to {register ? "Login?" : "Register?"}
      </Button>
    </div>
  );
};

export default Auth;

// import { useContext, useState } from "react";
// import axios from "axios";
// import AuthContext from "../store/authContext";
// import { Navigate, useNavigate } from "react-router-dom";

// const Auth = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [register, setRegister] = useState(false);

//   const authCtx = useContext(AuthContext);

//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const body = {
//       username,
//       password,
//     };

//     axios
//       .post(register ? "/api/register" : "/api/login", body)
//       .then((res) => {
//         console.log("POST AUTH", res.data);
//         authCtx.login(res.data.token, res.data.exp, res.data.userId);

//       })
//       .catch((err) => {
//         setPassword("");
//         setUsername("");
//         console.log(err)
//         // alert(err);
//       });
//     setRegister(!register);
//   };

//   return (
//     <div>
//       {register ? (
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <h2>Welcome to macro. Please Register</h2>
//           <input
//             placeholder="username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             placeholder="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button>Register</button>
//         </form>
//       ) : (
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <h2>Welcome to macro. Please Sign In</h2>
//           <input
//             placeholder="username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             placeholder="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={() => navigate('/home')}>Sign In</button>
//         </form>
//       )}
//       <button onClick={() => setRegister(!register)}>
//         Need to {register ? "Login?" : "Register?"}
//       </button>
//     </div>
//   );
// };

// export default Auth;
