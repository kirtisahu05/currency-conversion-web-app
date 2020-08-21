import React from "react";
import loginImg from "../../login.svg";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Register = (props) => {

  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  const actionsHandler = (name, data, id) => {
    if(!name) return;
    switch((name.toLowerCase()).replace(/\s/g, '')){

      case 'handlechange':
        setState({ ...state, [id]: data.target.value });
        break;

      case 'handleregister':
        console.log(state);
        var userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
        } else {
          userInfo = [];
        }
        userInfo.push(state);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        props.history.push("/login");
        break;

      case 'handleforgot':
        props.history.push("/forgot-password");
        break;

      case 'handlelogin':
        console.log(props);
        props.history.push("/login");
        break;

      default: break
    }
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
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
            id="outlined-email" 
            label="Enter Email"
            placeholder="Enter Email" 
            type="text"
            value={state.email}
            onChange={(event) => actionsHandler('handlechange', event, 'email')}
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
        <Button variant="contained" color="primary" className="btn" onClick={() => actionsHandler('handleregister')}>
          Register
        </Button>
        <br />
        <br />
        <Typography variant="body1" component="span" color="primary" className="link"  onClick={() => actionsHandler('handleforgot')}>Forgot Password?</Typography>
        <br />
        <br />
        <Typography variant="body1" component="span">
          Already have an account?
          <Typography variant="body1" component="span" color="primary" className="link" onClick={() => actionsHandler('handlelogin')}> Sign in </Typography>
        </Typography>
      </div>
    </div>
  );
}

export default Register;