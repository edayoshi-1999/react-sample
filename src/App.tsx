import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(i: number){
    
    // 一度クリックされたマスは無視する。何か入っていればtrueになる。
    // 勝者が決まっている場合も無視する。
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    // クリックされたマスにxかoを入れる。
    // xIsNextがtrueならxを入れる。falseならoを入れる。
    if(xIsNext){
      nextSquares[i] = "x";
    }else{
      nextSquares[i] ="o";
    }
    
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }

  // 勝者を判定する関数を呼び出す。
  // 勝者が決まっていればその記号を返す。
  // 勝者が決まっていなければnullを返す。
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }else{
    status = "Next player: " + (xIsNext ? "x" : "o");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;

function Square({value, onSquareClick}: {value: string | null; onSquareClick: () => void}) {
  
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

//勝ち負けを判定する関数
function calculateWinner(squares: (string | null)[]){

  // 勝利条件を定義する。
  // 3つのマスが同じであれば勝利。
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i<lines.length; i++){
    // linesの中の配列をa,b,cに分ける。
    const[a,b,c] = lines[i];
    //3マス（a, b, c）が**全部同じ記号（"X" か "O"）**で埋まっていれば、その記号を返す
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  // 勝者がいなければnullを返す
  return null;
}