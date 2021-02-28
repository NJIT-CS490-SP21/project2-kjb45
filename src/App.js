import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Board } from './Board.js';
import { User } from './User.js';
import users from './User.js';
import io from 'socket.io-client';

const socket = io(); //connects to socket connection


function App() {
    
const [isShown, setShown] = useState(true);
function onShowHide() {
    setShown((prevShown) => {
        return !prevShown;
        
    });
}

    
     return (
        <div className="App">
            <User />
            {isShown === true ? <Board /> : null}
        </div>
        
    );
    
}
  

export default App;
