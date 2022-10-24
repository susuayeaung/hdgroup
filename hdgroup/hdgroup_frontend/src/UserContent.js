import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';

const UserContent = (props) => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';

    const logoutHandler = () => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>
            Hello {name}! <br/><br/>
            <input type="button" value="logout" onClick={logoutHandler} />
        </div>
    )
}

export default UserContent;