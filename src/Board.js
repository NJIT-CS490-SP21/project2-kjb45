import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { Box } from './Box.js'


export function Board(props){

const [board, setBoard] = useState([8]);

function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    console.log("box clicked");
    setBoard(prevBoard => [...prevBoard,'X']);
    //let item = newBoard[index];
    //console.log(index);
}

return (
    <div className="board">
        <Box onClick={() => clicked(0)}/>
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