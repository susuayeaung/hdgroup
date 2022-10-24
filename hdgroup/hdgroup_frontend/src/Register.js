import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = 'https://hg1vowtiuc.execute-api.us-east-1.amazonaws.com/prod/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '' || image.trim() === ''){
            setMessage('All fields are required!');
            return;
        }
        setMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': '5COAcsGeLs7VzL4hNC5s5a4OaSedhAl36wCr0EUK'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password,
            image: image
        }
        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registration Successful!');
        }).catch(error => {
            if(error.response.status === 401 ||
                error.response.status === 403){
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Sorry the server is down. Please try again later.");
                }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /><br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event =>setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                image: <input type="file" value={image} onChange={event => setImage(event.target.files)} /> <br/>
                <input type="submit" value="Register" />
            </form>
            { message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;