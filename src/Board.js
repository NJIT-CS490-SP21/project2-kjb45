import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { Box } from './Box.js'
import io from 'socket.io-client';


const socket = io(); //connects to socket connection

export function showBoard(){
    
    document.getElementById("brd").style.display="grid";

}

export function Board(props){
    
const [board, setBoard] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
const [move, setMove] = useState(0);
const [playx, setPlayX] = useState('');
const [playo, setPlayO] = useState('');

function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    if (props.currentUser === playx || props.currentUser === playo){
    console.log("box clicked");
    const boardCopy = [...board];
    //if ()
    (move === 0 ? (boardCopy[index] = 'X') : boardCopy[index] = 'O');
    setBoard(boardCopy);
    socket.emit('board', {
        board: boardCopy,
        move: move,
        player1: playx,
        player2: playo
        //sender: 
        
    });
    (move === 0 ? setMove(1) : setMove(0));
    } 
}



useEffect(() => {
    //listening for a new move event
    //run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
        console.log('New move event recieved');
        console.log(data);
        let currentMove = data['move'];
        setBoard(prevBoard => {
           let boardCopy = [...prevBoard]; 
           boardCopy = data['board'];
           return boardCopy;
        });
        (currentMove === 0 ? setMove(1) : setMove(0));


    });
       
       
    socket.on('new user', (data) => {
        //console.log("This is user from board");        
        //console.log(data);
        let check = data['count'];
        let user = data['user'];
        
        if (check === 1){
          
          setPlayX(data['user']);
        }
        
        if (check === 2){
            
            setPlayO(data['user']);
        }
        

    });

}, []);




// console.log("this is the board userlist 0");
// console.log(userList[0]);
// console.log("this is playerX");
// console.log(playx);
// console.log("this is player0");
// console.log(playo);

//console.log(board);
//console.log(move);

return (
    <div className="board" id="brd">
        
        <Box onClick={() => clicked(0)} newMove={board[0]}/> 
        <Box onClick={() => clicked(1)} newMove={board[1]}/> 
        <Box onClick={() => clicked(2)} newMove={board[2]}/> 
        <Box onClick={() => clicked(3)} newMove={board[3]}/> 
        <Box onClick={() => clicked(4)} newMove={board[4]}/> 
        <Box onClick={() => clicked(5)} newMove={board[5]}/> 
        <Box onClick={() => clicked(6)} newMove={board[6]}/> 
        <Box onClick={() => clicked(7)} newMove={board[7]}/> 
        <Box onClick={() => clicked(8)} newMove={board[8]}/> 

        <div>
            {board}
        </div>
    </div>

    )
    
}