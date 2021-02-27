import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { Box } from './Box.js'


export function Board(props){

const [board, setBoard] = useState(['','','','','','','','','']);
const [move, setMove] = useState(['']);
var trueIndex;

function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    console.log("box clicked");
    setBoard(prevBoard => {
        const boardCopy = [...prevBoard];
        boardCopy[index] = 'X';
        return boardCopy;
    });

}

console.log(board);


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
    

    );
    
}