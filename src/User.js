import React from 'react';
import { useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io(); //connects to socket connection

export function User(props){

const inputRef = useRef(null);    
const [user, setUser] = useState([]);
const [currentUser, setCurrentUser] = useState('');

function getCurrentUser(name) {
    const user = inputRef.current.value;
    setCurrentUser(name);
    
}

return(
    <div>
        <input ref={inputRef} type="text" />
        <button onClick={()=> getCurrentUser()}>Submit your User</button>
        <div>{currentUser}</div>
    </div>
    );

    
}

