import React from "react";
import _ from 'underscore';

import loginImg from "../../login.svg";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Login = (props) => {

  const [state, setState] = React.useState({
    username: '',
    password: ''
  });

  const actionsHandler = (name, data, id) => {
    if(!name) return;
    switch((name.toLowerCase()).replace(/\s/g, '')){

      case 'handlechange':
        setState({ ...state, [id]: data.target.value });
        break;

      case 'handlelogin':
        console.log(state);
        var userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          var user = _.findWhere(userInfo, {username: state.username});
          if (user) {
            if (user.password === state.password) {
              props.history.push("/dashboard");
            } else {
              alert("Incorrect Password!");
            }
          } else {
            alert("User Not Found!");
          }
        } else {
          alert("User Not Found!");
        }
        break;

      case 'handleforgot':
        props.history.push("/forgot-password");
        break;

      case 'handleregister':
        props.history.push("/register");
        break;

      default: break
    }
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="form">
          <TextField 
            className="width100"
            id="outlined-username" 
            label="Enter Username"
            placeholder="Enter Username" 
            type="text"
            value={state.username}
            onChange={(event) => actionsHandler('handlechange', event, 'username')}
            variant="outlined" />
          <br />
          <br />
          <TextField 
            className="width100"
            id="outlined-password" 
            label="Enter Password"
            placeholder="Enter Password" 
            type="text"
            value={state.password}
            onChange={(event) => actionsHandler('handlechange', event, 'password')}
            variant="outlined" />
        </div>
      </div>
      <div className="footer">
        <Button variant="contained" color="primary" className="btn" onClick={() => actionsHandler('handlelogin')}>
          Login
        </Button>
        <br />
        <br />
        <Typography variant="body1" component="span" color="primary" className="link" onClick={() => actionsHandler('handleforgot')}>Forgot Password?</Typography>
        <br />
        <br />
        <Typography variant="body1" component="span">
          Not a Member Yet?
          <Typography variant="body1" component="span" color="primary" className="link" onClick={() => actionsHandler('handleregister')}> Sign up </Typography>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
