import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { Box } from './Box.js'


export function Board(props){

const [board, setBoard] = useState([]);

function clicked(index){
    //const userInput = useRef.current.value;
    console.log("box clicked");
    setBoard(prevBoard => [...prevBoard, 'X']);
    
}

return (
    <div className="board">
        <Box onClick={() => clicked(1)}/>
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