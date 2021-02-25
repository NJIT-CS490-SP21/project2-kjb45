import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { Box } from './Box.js'


export function Board(props){

const [board, setBoard] = useState([]);

function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    console.log("box clicked");
    setBoard(prevBoard => [...prevBoard,'X']);
    console.log(board);
    var move = board[0];
    console.log(move);
    //let item = newBoard[index];
    //console.log(index);
}

let move = board[0];


return (
    <div className="board">
        
        <Box onClick={() => clicked(0)} move={move}/>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
    </div>
    

    );
    
}