import React, {useEffect, useState} from 'react';

import BoardComponent from './components/BoardComponent';
import LostFigures from "./components/LostFigures";
import Timer from './components/Timer';
import './App.css';
import {Board, Colours, Player} from "./models";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer] = useState(new Player(Colours.WHITE));
    const [blackPlayer] = useState(new Player(Colours.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.colour === Colours.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className="app">
            <Timer restart={restart} currentPlayer={currentPlayer}/>
            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <div>
                <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
                <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
}

export default App;
