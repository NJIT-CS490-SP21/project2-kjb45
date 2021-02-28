import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Board } from './Board.js';
import { User } from './User.js';
import users from './User.js';
import io from 'socket.io-client';

const socket = io(); //connects to socket connection


function App() {
    
    
     return (
        <div className="App">
            <User />
            <Board />
        
        </div>
        
    );
    
}
  

export default App;
