import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Board } from './Board.js';
import { User } from './User.js';
import io from 'socket.io-client';


const socket = io(); //connects to socket connection


function App() {

const [isShown, setShown] = useState(true); 
const [userCount, setUserCount] = useState(0);
const [display, setDisplay] = useState([]);

const user = '';
    
function onShowHide() {
    setShown((prevShown) => {
        return !prevShown;
        
    });
}

    
useEffect(() => {
    
    //socket.on('connect', () => {
     //  setShown(false);
       
        
    //});
    
   // socket.on('new user',(data) => {
    //    setUserCount(prevCount => prevCount + 1);
     //   console.log(data);
        //user = data['user'];
        
   // });
})


///socket.emit('turn', {
 ///   user: user,
///    id: userCount,
    
///});    
///{isShown === true ? <Board /> : null}   
          
return (
    <div className="App">
        <User />
        {isShown === true ? <Board /> : null}   
    </div>
        
    );
    
}
  

export default App;
