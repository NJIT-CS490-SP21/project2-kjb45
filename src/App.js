import './App.css';
import React, {
  useState, useEffect, useRef,
} from 'react';

import io from 'socket.io-client';
import { Board, showBoard } from './Board';

const socket = io(); // connects to socket connection

function App() {
  const [isShown, setShown] = useState(true);
  const inputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [count, setCount] = useState(0);

  const [spectators, setSpectators] = useState([]);
  const [winner, setWinner] = useState(['']);
  const [someoneWon, setSomeoneWon] = useState('');
  const [draw, setSomeoneDrew] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState({});

  function getCurrentUser() {
    const user = inputRef.current.value;
    const newCount = count + 1;

    setCurrentUser(user);
    setCount(newCount);

    if (newCount === 1) {
      socket.emit('new user', {
        user,
        count: newCount,
        player: 'X',

      });
    }

    if (newCount === 2) {
      socket.emit('new user', {
        user,
        count: newCount,
        player: 'O',

      });
    }

    if (newCount > 2) {
      setSpectators([...spectators, user]);
      socket.emit('new user', {
        user,
        count: newCount,
        player: 'spectator',

      });
    }

    showBoard();
  }

  function onShowHide() {
    setShown((prevShown) => !prevShown);
  }

  function newGame() {
    const restartBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    setSomeoneWon(false);
    setSomeoneDrew(false);
    setWinner('');

    socket.emit('new game', {
      restartBoard,

    });
  }

  function leaderBoardShow() {
    return (
      <ul>
        {Object.entries(leaderBoard).map(([key, value]) => (
          <li key={key}>
            <b>
              {key}
              :
              {' '}
            </b>
            {' '}
            {value}
          </li>
        ))}

      </ul>
    );
  }

  useEffect(() => {
    socket.on('new user', (data) => {
      setUsers((prevUser) => [...prevUser, data.user]);
      setCount(data.count);
    });

    socket.on('winner', (data) => {
      const { winnerName } = data;
      setWinner(winnerName);
      setSomeoneWon(true);
    });

    socket.on('draw', (data) => {
      setWinner(data);
      setSomeoneDrew(true);
    });

    socket.on('new game', () => {
      setSomeoneDrew(false);
      setSomeoneWon(false);
    });

    socket.on('leader board', (data) => {
     
      setLeaderBoard(data.users);
    });
  }, []);

  return (
    <div className="App">
      <div>

        {someoneWon === true ? (
          <div>
            The winner is:
            {winner}
          </div>
        ) : null}
        {draw === true ? <div>The game ended in a draw </div> : null}

        {someoneWon === true || draw === true ? <div>Do you want to play again?</div> : null}
        {someoneWon === true || draw === true ? <button type="button" onClick={() => newGame()}>Yes</button> : null}
        <input ref={inputRef} type="text" />
        <button type="button" onClick={() => getCurrentUser()}>Login!</button>
        <div>
          You are logged in as:
          {currentUser}
        </div>
        <div>
          Users in Lobby
          {users.map((item) => (
            <li>{item}</li>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => onShowHide()}>Leader Board</button>
          {isShown !== true ? (
            <div>
              <h3>Current Leader Board</h3>
              <div>{leaderBoardShow()}</div>
            </div>
          ) : null}
        </div>

      </div>
      <div>
        <Board currentUser={currentUser} />
      </div>
    </div>

  );
}

export default App;
