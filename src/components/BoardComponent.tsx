import React, {FC, useEffect, useState} from 'react';

import CellComponent from "./CellComponent";
import {Board, Cell, Player} from "../models";

interface BoardProps {
    board: Board;
    currentPlayer: Player | null;
    setBoard: (board: Board) => void
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            if (cell.figure?.colour === currentPlayer?.colour)
                setSelectedCell(cell);
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Player: {currentPlayer?.colour}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell => <CellComponent key={cell.id} cell={cell} click={click}
                                                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>)}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;
