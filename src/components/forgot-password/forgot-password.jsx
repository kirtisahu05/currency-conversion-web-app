import React from "react";
import _ from 'underscore';

import loginImg from "../../login.svg";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ForgotPassword = (props) => {

  const [state, setState] = React.useState({
    email: '',
    password: ''
  });

  const actionsHandler = (name, data, id) => {
    if(!name) return;
    switch((name.toLowerCase()).replace(/\s/g, '')){

      case 'handlechange':
        setState({ ...state, [id]: data.target.value });
        break;

      case 'handlereset':
        console.log(state);
        var userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          var user = _.findWhere(userInfo, {email: state.email});
          if (user) {
            user.password = state.password;
            var a = _.reject(userInfo, {email: state.email});
            a.push(user);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            props.history.push("/login");
          } else {
            alert("User Not Found!");
          }
        } else {
          alert("User Not Found!");
        }
        break;

      case 'handlelogin':
        props.history.push("/login");
        break;

      case 'handleregister':
        props.history.push("/register");
        break;

      default: break
    }
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Forgot Password</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="form">
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
        <Button variant="contained" color="primary" className="btn" onClick={() => actionsHandler('handlereset')}>
          Reset Password
        </Button>
        <br />
        <br />
        <Typography variant="body1" component="span">
          Already have an account?
          <Typography variant="body1" component="span" color="primary" className="link" onClick={() => actionsHandler('handlelogin')}> Sign in </Typography>
        </Typography>
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

export default ForgotPassword;
