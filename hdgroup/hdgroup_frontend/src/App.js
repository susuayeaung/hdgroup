import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import UserContent from "./UserContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";


const verifyTokenUrl = 'https://hg1vowtiuc.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {

  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token){
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': '5COAcsGeLs7VzL4hNC5s5a4OaSedhAl36wCr0EUK'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenUrl, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if(isAuthenicating && token){
    return <div className="content">Authenicating...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/user-content">User Content</NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/Register" component={Register}/>
          <PublicRoute path="/Login" component={Login}/>
          <PrivateRoute path="/User-content" component={UserContent}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
