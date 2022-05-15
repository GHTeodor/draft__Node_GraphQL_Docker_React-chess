import {Cell} from "./Cell";
import {Colours} from "./Colours";
import {King, Queen, Rook, Bishop, Knight, Pawn, Figure} from "./figures";

export class Board {
    cells: Cell[][] = [];
    lostWhiteFigures: Figure[] = [];
    lostBlackFigures: Figure[] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                (i + j) % 2 !== 0
                    ? row.push(new Cell(this, j, i, Colours.BLACK, null)) // Black
                    : row.push(new Cell(this, j, i, Colours.WHITE, null)); // White
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addQueens() {
        new Queen(Colours.BLACK, this.getCell(3, 0));
        new Queen(Colours.WHITE, this.getCell(3, 7));
    }

    private addKings() {
        new King(Colours.BLACK, this.getCell(4, 0));
        new King(Colours.WHITE, this.getCell(4, 7));
    }

    private addBishops() {
        new Bishop(Colours.BLACK, this.getCell(2, 0));
        new Bishop(Colours.BLACK, this.getCell(5, 0));
        new Bishop(Colours.WHITE, this.getCell(2, 7));
        new Bishop(Colours.WHITE, this.getCell(5, 7));
    }

    private addKnights() {
        new Knight(Colours.BLACK, this.getCell(1, 0));
        new Knight(Colours.BLACK, this.getCell(6, 0));
        new Knight(Colours.WHITE, this.getCell(1, 7));
        new Knight(Colours.WHITE, this.getCell(6, 7));
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colours.BLACK, this.getCell(i, 1));
            new Pawn(Colours.WHITE, this.getCell(i, 6));
        }
    }

    private addRooks() {
        new Rook(Colours.BLACK, this.getCell(0, 0));
        new Rook(Colours.BLACK, this.getCell(7, 0));
        new Rook(Colours.WHITE, this.getCell(0, 7));
        new Rook(Colours.WHITE, this.getCell(7, 7));
    }

    public addFigures() {
        this.addQueens();
        this.addKings();
        this.addBishops();
        this.addKnights();
        this.addPawns();
        this.addRooks();
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }
}
