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
const [gameComplete, setGameComplete] = useState(false);
const [plays, setPlays] = useState(0);
const [thereIsAWinner, setAWinner] = useState(false);

function checkWin(){
    //console.log("reached checkwin function");
    let checkBoard = board;
    //console.log(checkBoard);
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[1] && checkBoard[1] === checkBoard[2]){
        console.log("someone has won the game 1");
        let winner = checkBoard[0];
        console.log("the winner is: ");
        console.log(winner);
        //setAWinner(true);
    }
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[3] && checkBoard[3] === checkBoard[6]){
        console.log("someone has won the game 2");
        let winner = checkBoard[0];
        //setAWinner(true);

    }
    if (checkBoard[4] != ' ' && checkBoard[4] === checkBoard[1] && checkBoard[1] === checkBoard[7]){
        console.log("someone has won the game 3");
        let winner = checkBoard[4];
        //setAWinner(true);

    }
    if (checkBoard[2] != ' ' && checkBoard[2] === checkBoard[5] && checkBoard[5] === checkBoard[8]){
        console.log("someone has won the game 4");
        let winner = checkBoard[2];
        //setAWinner(true);

    }
    if (checkBoard[3] != ' ' && checkBoard[3] === checkBoard[4] && checkBoard[4] === checkBoard[5]){
        console.log("someone has won the game 5");
        let winner = checkBoard[3];
        //setAWinner(true);

    }
    if (checkBoard[6] != ' ' && checkBoard[6] === checkBoard[7] && checkBoard[7] === checkBoard[8]){
        console.log("someone has won the game 6");
        let winner = checkBoard[6];
        //setAWinner(true);

    }
    if (checkBoard[2] != ' ' && checkBoard[2] === checkBoard[4] && checkBoard[4] === checkBoard[6]){
        console.log("someone has won the game 7");
        let winner = checkBoard[2];
        //setAWinner(true);
     
    } 
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[4] && checkBoard[4] === checkBoard[8]){
        console.log("someone has won the game 8");
        let winner = checkBoard[0];
        //setAWinner(true);
       
    }
    
    
}

function clicked(index){
    //const userInput = useRef.current.value;
    //let newBoard = [];
    if (props.currentUser === playx || props.currentUser === playo){
    console.log("box clicked");
    let playCount = plays + 1;
    console.log(playCount);
    setPlays(playCount);
    const boardCopy = [...board];
    //if ()
    (move === 0 ? (boardCopy[index] = 'X') : boardCopy[index] = 'O');
    setBoard(boardCopy);
    socket.emit('board', {
        board: boardCopy,
        move: move,
        player1: playx,
        player2: playo,
        playCount: playCount
        
        //sender: 
        
    });
    (move === 0 ? setMove(1) : setMove(0));
    
    } 
}

if (plays > 4){
    console.log('checking for a winner');
    checkWin();
    
}

// if (thereIsAWinner === true){
//     console.log("reafched there is a winner");
// }

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
        setPlays(data['playCount']);


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