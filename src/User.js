import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Board } from './Board.js'
import io from 'socket.io-client';

const socket = io(); //connects to socket connection

export function User(){

const inputRef = useRef(null);    
const [users, setUsers] = useState([]);
const [currentUser, setCurrentUser] = useState('');
const [count, setCount] = useState(0);


function getCurrentUser() {
    const user = inputRef.current.value;
    let prevCount = count;
    let newCount = prevCount + 1;
    setCurrentUser(user);
    setUsers(prevUser => [...prevUser, user]);
    setCount(newCount);
    socket.emit('new user', {
        user: user,
        count: newCount
    });
    
}


useEffect(() => {
    //listening for a new move event
    //run the code in the function that is passed in as the second arg
    
    socket.on('new user', (data) => {
       console.log('New user event recieved');
       console.log(data);
       console.log(data['user'])
       setUsers(prevUser => [...prevUser, data['user']]);
       setCount(data['count']);
       
    });
}, []);


//console.log(users);
return(
    <div>
        <input ref={inputRef} type="text" />
        <button onClick={() => getCurrentUser()} >Login!</button>
        <div>You are logged in as: {currentUser}</div>
        <div>Users in Lobby{users.map((item) => (
                <li>{item}</li>
            ))}
        </div>
    </div>
    );


}



