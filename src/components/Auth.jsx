import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
  errorMessage: {
    color: "red",
    marginTop: theme.spacing(1),
    animation: "$fadeIn 0.5s ease-in-out",
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

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
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        navigate("/home");
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
        setErrMessage(true);
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
        height: "100vh",
      }}
    >
      <div className={classes.form}>
        <Typography variant="h2" style={{ marginTop: "65px" }}>
          Macro
        </Typography>
        <div style={{ width: "30%", maxWidth: "800px" }}>
          <Paper className={classes.form}>
            <TextField
              label="Username"
              className={classes.textField}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              style={{ width: "70%" }}
            />
            <TextField
              label="Password"
              type="password"
              className={classes.textField}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyPress={(e) => handleKeyPress(e)}
              style={{ width: "70%" }}
            />
            {errMessage && (
              <Typography variant="body2" className={classes.errorMessage}>
                incorrect username or password
              </Typography>
            )}
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
          </Paper>
        </div>
      </div>
      <style>
    {`
      @media only screen and (max-width: 600px) {
        .form {
          width: 80%;
        }
        .textField {
          width: 100%;
        }
        .button {
          width: 100%;
        }
      }
    `}
  </style>
    </div>
  );
};

export default Auth;
