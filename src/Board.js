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
const [plays, setPlays] = useState(0);
const [winnerName, setWinnerName] = useState('');
const [draw, setDraw] = useState(false);

function checkWin(board,player1,player2){
    let checkBoard = board;
 
    console.log(board);
    console.log("check board");
    console.log(checkBoard);
    console.log("running through win states");
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[1] && checkBoard[1] === checkBoard[2]){
        let winner = checkBoard[0];
        let actualWinner = '';
        let actualLoser = '';
        console.log("the winner is: ");
        console.log(winner);
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        console.log("sending winner");

        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
            
        })

    }
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[3] && checkBoard[3] === checkBoard[6]){
        console.log("someone has won the game 2");
        let winner = checkBoard[0];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
            
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loesrName: actualLoser
            
        })        

    }
    if (checkBoard[4] != ' ' && checkBoard[4] === checkBoard[1] && checkBoard[1] === checkBoard[7]){
        console.log("someone has won the game 3");
        let winner = checkBoard[4];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
            
        })
    }
    if (checkBoard[2] != ' ' && checkBoard[2] === checkBoard[5] && checkBoard[5] === checkBoard[8]){
        console.log("someone has won the game 4");
        let winner = checkBoard[2];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
        })
    }
    if (checkBoard[3] != ' ' && checkBoard[3] === checkBoard[4] && checkBoard[4] === checkBoard[5]){
        console.log("someone has won the game 5");
        let winner = checkBoard[3];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualWinner = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
        })
    }
    if (checkBoard[6] != ' ' && checkBoard[6] === checkBoard[7] && checkBoard[7] === checkBoard[8]){
        console.log("someone has won the game 6");
        let winner = checkBoard[6];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
        })
    }
    if (checkBoard[2] != ' ' && checkBoard[2] === checkBoard[4] && checkBoard[4] === checkBoard[6]){
        console.log("someone has won the game 7");
        let winner = checkBoard[2];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
        })
    } 
    if (checkBoard[0] != ' ' && checkBoard[0] === checkBoard[4] && checkBoard[4] === checkBoard[8]){
        console.log("someone has won the game 8");
        let winner = checkBoard[0];
        let actualWinner = '';
        let actualLoser = '';
        if (winner === 'X'){
            actualWinner = player1;
            actualLoser = player2;
            
        }
        if (winner === 'O'){
            actualWinner = player2;
            actualLoser = player1;
        }
        socket.emit('winner', {
            winner: winner,
            winnerName: actualWinner,
            loserName: actualLoser
            
        })
    }
}

function clicked(index){
    
    let playCount = plays + 1;

    if (props.currentUser === playx || props.currentUser === playo){
    console.log("box clicked");
    console.log(playCount);
    setPlays(playCount);
    const boardCopy = [...board];
    (move === 0 ? (boardCopy[index] = 'X') : boardCopy[index] = 'O');
    setBoard(boardCopy);
    socket.emit('board', {
        board: boardCopy,
        move: move,
        player1: playx,
        player2: playo,
        playCount: playCount
        

    });
    (move === 0 ? setMove(1) : setMove(0));
    
    } 
    
   
}






useEffect(() => {
   
    socket.on('board', (data) => {
        console.log('New move event recieved');
        console.log(data);
        console.log('new board revieved');
        console.log(data['board']);
        let currentMove = data['move'];
        setBoard(prevBoard => {
           let boardCopy = [...prevBoard]; 
           boardCopy = data['board'];
           return boardCopy;
        });
        (currentMove === 0 ? setMove(1) : setMove(0));
        setPlays(data['playCount']);
        let plays = data['playCount'];
        
        if (plays === 9){
            socket.emit('draw', {
                winner: 'Draw'
        })
     
        }
        
        if (plays > 4){
            console.log('checking for a winner');
            
            console.log(data['player1']);
            checkWin(data['board'],data['player1'],data['player2']);
        }


    });
       
       
    socket.on('new user', (data) => {
        
        let check = data['count'];
        let user = data['user'];
        
        if (check === 1){
            setPlayX(data['user']);
        }
        
        if (check === 2){
            setPlayO(data['user']);
        }
    });
    
    socket.on('new game', (data) => {
        setBoard(data['restartBoard']);
        setMove(0);
        setPlays(0);
        setWinnerName('');
        
    });
    
    
}, []);


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