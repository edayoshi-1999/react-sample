import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Game(){
  // useStateを使って、状態を管理する。
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; 
  const currentSquares = history[currentMove];

  // 現在の手を進める関数(マス目をクリックしたときに動く。)
  function handlePlay(nextSquares : (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 現在の手をその番号まで戻す関数
  function jumpTo(nextMove: number){
    setCurrentMove(nextMove);
  }

  //履歴を表示するための配列を作成
  const moves = history.map((squares, move) => {
	let description: string;
	if(move > 0){
	  description = `Go to move #${move}`;
	} else {
	  description = "Go to game start";
	}

  // ユニークなキーを生成
    const key = `history-${move}`;
  
	return (
	  <li key={key}>
		<button type="button" onClick={() => jumpTo(move)}>{description}</button>
	  </li>
	);
  });

  return(
    <div className="game">
    <div className="game-board">
      <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
  );
}

export default Game;

function App({xIsNext, squares, onPlay}: { xIsNext: boolean; squares: (string | null)[]; onPlay: (nextSquares: (string | null)[]) => void }) {

	function handleClick(i: number) {
		// 一度クリックされたマスは無視する。何か入っていればtrueになる。
		// 勝者が決まっている場合も無視する。
		if (squares[i] || calculateWinner(squares)) {
			return;
		}

		const nextSquares = squares.slice();
		// クリックされたマスにxかoを入れる。
		// xIsNextがtrueならxを入れる。falseならoを入れる。
		if (xIsNext) {
			nextSquares[i] = "x";
		} else {
			nextSquares[i] = "o";
		}

    onPlay(nextSquares);

	}

	// 勝者を判定する関数を呼び出す。
	// 勝者が決まっていればその記号を返す。
	// 勝者が決まっていなければnullを返す。
	const winner = calculateWinner(squares);
	let status: string;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? "x" : "o"}`;
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

function Square({
  //引数
	value,
	onSquareClick,
}: { value: string | null; onSquareClick: () => void }) { //引数の型（propsの型）
	return (
		<button type="button" className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

//勝ち負けを判定する関数
function calculateWinner(squares: (string | null)[]) {
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

	for (let i = 0; i < lines.length; i++) {
		// linesの中の配列をa,b,cに分ける。
		const [a, b, c] = lines[i];
		//3マス（a, b, c）が**全部同じ記号（"X" か "O"）**で埋まっていれば、その記号を返す
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	// 勝者がいなければnullを返す
	return null;
}
