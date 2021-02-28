import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { User } from './User.js';
import io from 'socket.io-client';


const socket = io(); //connects to socket connection


function App() {

const [isShown, setShown] = useState(false);    
    
function onShowHide() {
    setShown((prevShown) => {
        return !prevShown;
        
    });
}
    
    
useEffect(() => {
    
    socket.on('new user',() => {
        setShown(true);
    });
})
   
          
     return (
        <div className="App">
            <User />
            {isShown === true ? <Board /> : null}
        </div>
        
    );
    
}
  

export default App;
