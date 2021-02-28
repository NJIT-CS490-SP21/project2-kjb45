import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { Box } from './Box.js'
import io from 'socket.io-client';


const socket = io(); //connects to socket connection
export function Board(props){

const [board, setBoard] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
const [move, setMove] = useState(0);


    
function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    console.log("box clicked");
    setBoard(prevBoard => {
        const boardCopy = [...prevBoard];
        
        (move === 0 ? (boardCopy[index] = 'X') : boardCopy[index] = 'O');
        socket.emit('board', {board: boardCopy});
        return boardCopy;
        
    });
    
    (move === 0 ? (setMove(1)) : setMove(0));


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
    
}, []);

console.log(board);
console.log(move);

return (
    <div className="board">
        

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