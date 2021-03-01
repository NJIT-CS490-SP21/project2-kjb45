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
const [canPlay, setCanPlay] = useState(true);
const [turn, setTurn] = useState(0);


    
function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    console.log("box clicked");
    const boardCopy = [...board];
    (move === 0 ? (boardCopy[index] = 'X') : boardCopy[index] = 'O')
    setBoard(boardCopy);
    socket.emit('board', {board: boardCopy});

    (move === 0 ? setMove(1) : setMove(0));

    //socket.emit('turn', )
}



useEffect(() => {
    //listening for a new move event
    //run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
       console.log('New move event recieved');
       console.log(data);
       setBoard(prevBoard => {
           let boardCopy = [...prevBoard]; 
           boardCopy = data['board'];
           return boardCopy;
       });
    });
       
    socket.on('turn', (data) => {
        console.log("this is user list from board.js");
        console.log(data);
       //console.log(data['id']);
   
    });  
       
    socket.on('new user', (data) => {
       console.log("This is user from board");        
       console.log(data);
       let check = data['count'];
       
      // (check === 1 ? setCanPlay(true) : null);   
      // (check === 2 ? setCanPlay(true) : null);
        
    });

}, []);


//console.log(board);
//console.log(move);

return (
    <div className="board" id="brd">
    

        {canPlay === true ?<Box onClick={() => clicked(0)} newMove={board[0]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(1)} newMove={board[1]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(2)} newMove={board[2]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(3)} newMove={board[3]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(4)} newMove={board[4]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(5)} newMove={board[5]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(6)} newMove={board[6]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(7)} newMove={board[7]}/> : <Box />}
        {canPlay === true ?<Box onClick={() => clicked(8)} newMove={board[8]}/> : <Box />}

        <div>
            {board}
        </div>
    </div>
    
    )
    
}