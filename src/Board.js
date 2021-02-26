import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';
import { Box } from './Box.js'


export function Board(props){

const [board, setBoard] = useState(['','','','','','','','','']);
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


    function getIndex(index){
        console.log("this is the index");
        console.log(index);
        
    }
    
    trueIndex = index;
    console.log("This is the true index");
    console.log(trueIndex);
    //listcopy[index] = ''; <-- answers
    //return listcopy; <-- answers
    var move = board[index];
    console.log(move);
    //let item = newBoard[index];
    //console.log(index);
}

console.log(board);
//console.log(trueIndex);
//console.log("This is the move");
//console.log(move);


return (
    <div className="board">
        
        <Box onClick={() => clicked(0)} />
        <Box onClick={() => clicked(1)} />
        <Box onClick={() => clicked(2)} />
        <Box onClick={() => clicked(3)} />
        <Box onClick={() => clicked(4)} />
        <Box onClick={() => clicked(5)} />
        <Box onClick={() => clicked(6)} />
        <Box onClick={() => clicked(7)} />
        <Box onClick={() => clicked(8)} />
        
        <div>
            {board}
        </div>
    </div>
    

    );
    
}