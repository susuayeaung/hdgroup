import axios from 'axios';
import React, { useState } from 'react';
import { setUserSession } from './service/AuthService';

const loginUrl = 'https://hg1vowtiuc.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || password.trim() === ''){
            setErrorMessage('Both username and password are required!');
            return;
        }
        setErrorMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': '5COAcsGeLs7VzL4hNC5s5a4OaSedhAl36wCr0EUK'
            }
        }
        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then((response) => {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/user-content');
        }).catch((error) => {
            if(error.response.status === 401 || error.response.status === 403){
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Sorry the server is down. Please try again later.');
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" vlaue="Login" />
            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
    )
}

export default Login;