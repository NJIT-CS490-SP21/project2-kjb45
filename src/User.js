import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Board, showBoard } from './Board.js'
import io from 'socket.io-client';

const socket = io(); //connects to socket connection

export function User(){

const inputRef = useRef(null);    
const [users, setUsers] = useState([]);
const [currentUser, setCurrentUser] = useState('');
const [count, setCount] = useState(0);
const [player1, setPlayer1] = useState('');
const [player2, setPlayer2] = useState('');
const [spectators, setSpectators] = useState([]);
const [isLoggedIn, setLoggedIn] = useState(false);



function getCurrentUser() {
    const user = inputRef.current.value;
    let newCount = count + 1;
    let sendUsers = users;
    let player1 = '';
    let player2 = '';
    let spectatorList = [];
    //(newCount === 1 ? setPlayer1(user) : null);
    //(newCount === 2 ? setPlayer2(user) : null);
    //(newCount > 2 ? setSpectators(spectators => [...spectators, user]) : null);

    setCurrentUser(user);
    setUsers([...sendUsers, user]);
    setCount(newCount);
   
    player1 = newCount === 1 ? user : null;   
    player2 = newCount === 2 ? user : null;
        // (newCount = 2 ? setPlayer2(player2) : null);
    // (newCount = 3 ? [...spectatorList, user] : null);
    //(newCount > 2 ? setSpectators(spectatorList) : null);
    console.log("This is the list of spectators");
    console.log(spectatorList);
    console.log("This is player 1");
    console.log(player1);

    if (newCount === 1) {
        socket.emit('new user', {
            user: user,
            count: newCount,
            player : 'X'
        
        })
        
    };    
    
    if (newCount === 2) {
        socket.emit('new user', {
            user: user,
            count: newCount,
            player : 'O'
        
        })
        
    };        
    
    // (newCount === 2 ? socket.emit('new user', {
    //     user: user,
    //     count: newCount,
    //     player : 'O'
        
    // }) : null); 
    
    // (newCount > 2 ? socket.emit('new user', {
    //     user: user,
    //     count: newCount,
    //     player : 'Spectator'
    // }) : null);
    
    
    
    //socket.emit('turn', {users: sendUsers});
    
    setLoggedIn(true);
    showBoard();
    
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
console.log("this is")
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



